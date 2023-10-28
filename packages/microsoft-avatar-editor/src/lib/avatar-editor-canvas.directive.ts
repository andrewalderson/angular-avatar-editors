import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  Input,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Directive({
  selector: 'canvas[ngxAvatarEditorCanvas]',
  standalone: true,
})
export class NgxAvatarEditorCanvasDirective implements AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLCanvasElement> = inject(ElementRef);
  #injector = inject(Injector);

  // TODO - add a resize observer to the canvas and redraw the image
  #canvas = this.#elementRef.nativeElement;
  #context = this.#canvas.getContext('2d') as CanvasRenderingContext2D;
  #image = signal<HTMLImageElement | null>(null);

  #translation = signal(new DOMPointReadOnly());

  readonly _initialScale = computed(() => 1 / this._maximumScale());
  // the maximum scale the image can be to be at its natural width and height
  readonly _maximumScale = computed(() => {
    if (this.#image() == null) {
      return 0;
    }
    const image = this.#image() as HTMLImageElement;
    return Math.min(
      image.naturalWidth / this.#canvas.offsetWidth,
      image.naturalHeight / this.#canvas.offsetHeight
    );
  });
  // absolute scale is a value between 1 and maximumScale
  // we start at 1 because this is used as a multiplier
  #absoluteScale = signal(1);

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
    // it is safer to use an Observable here
    // because we need to write to signals in the #fitImage method
    toObservable(this.#image, { injector: this.#injector })
      .pipe(takeUntilDestroyed(this.#destroyRef), filter(Boolean))
      .subscribe((image) => this.#fitImage(image));

    effect(() => this.#draw(this.#translation()), { injector: this.#injector });
  }

  #loadImage(src: string) {
    const image = new Image();
    image.onload = () => {
      this.#image.set(image);
    };
    image.src = src;
  }

  #fitImage(image: HTMLImageElement) {
    const { naturalWidth, naturalHeight } = image;
    const { offsetWidth, offsetHeight } = this.#canvas;
    // these need to be explictly set because the canvas is sized with css
    this.#canvas.width = offsetWidth;
    this.#canvas.height = offsetHeight;

    const x = (offsetWidth - naturalWidth * this._initialScale()) / 2;
    const y = (offsetHeight - naturalHeight * this._initialScale()) / 2;

    this.#translation.set(new DOMPointReadOnly(x, y));
  }

  #draw(translation: DOMPointReadOnly) {
    if (this.#image() == null) {
      return;
    }
    const image = this.#image() as HTMLImageElement;
    const { naturalWidth, naturalHeight } = image;
    const { offsetWidth, offsetHeight } = this.#canvas;
    this.#context.fillRect(0, 0, offsetWidth, offsetHeight),
      this.#context.save();
    this.#context.translate(offsetWidth / 2, offsetHeight / 2);
    this.#context.transform(1, 0, 0, 1, 0, 0);
    // add rotation here when we support it
    this.#context.translate((-1 * offsetWidth) / 2, (-1 * offsetHeight) / 2);
    this.#context?.restore();

    this.#context.drawImage(
      image,
      translation.x,
      translation.y,
      (naturalWidth * this.#absoluteScale()) / this._maximumScale(),
      (naturalHeight * this.#absoluteScale()) / this._maximumScale()
    );
  }
}
