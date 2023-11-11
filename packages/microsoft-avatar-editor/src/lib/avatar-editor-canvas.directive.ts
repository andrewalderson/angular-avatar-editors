import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest } from 'rxjs';
import { NgxAvatarEditorStore } from './avatar-editor.store';

@Directive({
  selector: 'canvas[ngxAvatarEditorCanvas]',
  standalone: true,
})
export class NgxAvatarEditorCanvasDirective implements AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLCanvasElement> = inject(ElementRef);
  #injector = inject(Injector);
  #store = inject(NgxAvatarEditorStore);
  #canvas = this.#elementRef.nativeElement;
  #context = this.#canvas.getContext('2d') as CanvasRenderingContext2D;
  #image = new Image();

  #translation = signal(new DOMPointReadOnly());

  readonly _hostElement = this.#elementRef.nativeElement;

  // TODO - support passing Files, FileHandles or ArrayBuffers
  @Input({ required: true }) get src() {
    return this.#src;
  }
  set src(value: string) {
    this.#src = value;
    this.#loadImage(this.#src);
  }
  #src!: string;

  ngAfterViewInit(): void {
    // we can remove this once we make the current image bounds a computed signal
    // we need to figure out how to maintain the transaltion while scaling
    // if it was changed with in _translateBy
    combineLatest([
      toObservable(this.#store.cropBounds, { injector: this.#injector }),
      toObservable(this.#store.imageSize, { injector: this.#injector }),
    ])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(([bounds, size]) => this.#fitImage(bounds, size));

    effect(
      () =>
        this.#draw(
          this.#translation(),
          (this.#store.absoluteRotation() * Math.PI) / 180
        ),
      { injector: this.#injector }
    );
  }

  _scaleBy(step: number, globalOrigin?: DOMPointReadOnly) {
    const { width, height } = this.#store.cropBounds();
    // do these before setting relativeScale so we can do a delta
    // These are the current top left corner of the image
    let cx = (width - this.#store.imageWidth()) / 2;
    let cy = (height - this.#store.imageHeight()) / 2;

    // read this before updating relativeScale
    const currentScale = this.#store.absoluteScale();

    // set relativeScale so we have updated values for calculations below
    this.#store.relativeScale.update((value) =>
      this.#clamp(value + step, 0, 1)
    );

    // these will be the top left corner of the image after the new scale (relativeScale) is applied
    let tx = (width - this.#store.imageWidth()) / 2;
    let ty = (height - this.#store.imageHeight()) / 2;
    // the delta between the new translation and the previous

    if (globalOrigin) {
      cx = this.#translation().x;
      cy = this.#translation().y;
      // convert global coordinates to local coordinates
      // in the current rotated space
      const { x: ox, y: oy } = new DOMPoint(
        globalOrigin.x - this.#store.cropBounds().x,
        globalOrigin.y - this.#store.cropBounds().y
      ).matrixTransform(
        new DOMMatrix()
          .translateSelf(width / 2, height / 2)
          .rotateSelf(this.#store.absoluteRotation())
          .translateSelf((-1 * width) / 2, (-1 * height) / 2)
          .invertSelf()
      );

      tx =
        ox +
        ((this.#translation().x - ox) * this.#store.absoluteScale()) /
          currentScale;
      ty =
        oy +
        ((this.#translation().y - oy) * this.#store.absoluteScale()) /
          currentScale;
    }

    const dx = tx - cx;
    const dy = ty - cy;
    // if the image was dragged we don't want to reset the translation to the top left corner
    // so we use a delta here
    this._translateBy(dx, dy);
  }

  _rotateBy(delta: number) {
    this.#store.absoluteRotation.update((current) => current + delta);
  }

  _translateBy(deltaX: number, deltaY: number) {
    const { width, height } = this.#store.cropBounds();

    // clamp the x and y between 0 (top left corner of canvas) and how far left and up
    // we can drag the image at its current size and still remain outside the shade area
    this.#translation.update(
      ({ x, y }) =>
        new DOMPointReadOnly(
          this.#clamp(x + deltaX, width - this.#store.imageWidth(), 0),
          this.#clamp(y + deltaY, height - this.#store.imageHeight(), 0)
        )
    );
  }

  #loadImage(src: string) {
    this.#image.onload = () => {
      const { naturalWidth, naturalHeight } = this.#image;
      this.#store.imageSize.set({ naturalWidth, naturalHeight });
    };
    this.#image.src = src;
  }

  #fitImage(
    cropBounds: DOMRectReadOnly,
    imageSize: { naturalWidth: number; naturalHeight: number }
  ) {
    const { naturalWidth, naturalHeight } = imageSize;
    const { width, height } = cropBounds;

    // we will get rid of this method once we make the
    // bound sto draw the image a computed signal
    // because these are basically the same
    //const x = (this.#store.cropBounds().width - this.#store.imageWidth()) / 2;
    //const y = (this.#store.cropBounds().height - this.#store.imageHeight()) / 2;
    const x = (width - naturalWidth * this.#store.initialScale()) / 2;
    const y = (height - naturalHeight * this.#store.initialScale()) / 2;

    this.#translation.set(new DOMPointReadOnly(x, y));
  }

  #draw(translation: DOMPointReadOnly, rotationInRadians: number) {
    const { width, height } = this.#store.cropBounds();
    // set all pixels to transparent black so can use css to style the background
    this.#context.clearRect(0, 0, width, height);
    this.#context.save();
    this.#context.resetTransform();
    this.#context.translate(width / 2, height / 2);
    this.#context.rotate(rotationInRadians);
    this.#context.translate((-1 * width) / 2, (-1 * height) / 2);

    // TODO - make the bounds the image is drawn at a computed signal
    this.#context.drawImage(
      this.#image,
      translation.x,
      translation.y,
      this.#store.imageWidth(),
      this.#store.imageHeight()
    );

    this.#context.restore();
  }

  #clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }
}
