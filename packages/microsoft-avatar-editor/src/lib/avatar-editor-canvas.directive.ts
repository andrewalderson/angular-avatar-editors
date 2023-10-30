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
    combineLatest([
      toObservable(this.#store.cropBounds, { injector: this.#injector }),
      toObservable(this.#store.imageSize, { injector: this.#injector }),
    ])
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe(([bounds, size]) => this.#fitImage(bounds, size));

    effect(() => this.#draw(this.#translation()), { injector: this.#injector });
  }

  _scaleBy(step: number) {
    this.#store.relativeScale.update((value) =>
      this.#clamp(value + step, 0, 1)
    );

    // these will scale image from center
    // when we support wheel zoom we will need to translate this by the origin point
    // of the wheel zoom
    const tx = (this.#store.cropBounds().width - this.#store.imageWidth()) / 2;
    const ty =
      (this.#store.cropBounds().height - this.#store.imageHeight()) / 2;

    const point = new DOMPointReadOnly(tx, ty);
    this.#translation.set(point);
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
    const x = (width - naturalWidth * this.#store.initialScale()) / 2;
    const y = (height - naturalHeight * this.#store.initialScale()) / 2;

    this.#translation.set(new DOMPointReadOnly(x, y));
  }

  #draw(translation: DOMPointReadOnly) {
    const { width, height } = this.#store.cropBounds();
    this.#context.fillRect(0, 0, width, height);
    this.#context.save();
    this.#context.translate(width / 2, height / 2);
    this.#context.transform(1, 0, 0, 1, 0, 0);
    // add rotation here when we support it
    this.#context.translate((-1 * width) / 2, (-1 * height) / 2);
    this.#context?.restore();

    this.#context.drawImage(
      this.#image,
      translation.x,
      translation.y,
      this.#store.imageWidth(),
      this.#store.imageHeight()
    );
  }

  #clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }
}
