import {
  DestroyRef,
  Directive,
  ElementRef,
  HostListener,
  Injector,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { combineLatest, filter } from 'rxjs';

type ImageSize = { naturalWidth: number; naturalHeight: number };

@Directive({
  selector: 'img[ngxAvatarEditorImage]',
  standalone: true,
})
export class NgxAvatarEditorImageDirective implements OnInit {
  #destoryRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLImageElement> = inject(ElementRef);
  #injector = inject(Injector);

  @HostListener('load') loadHandler() {
    const { naturalWidth, naturalHeight } = this.#elementRef.nativeElement;
    this.#imageSize.set({ naturalWidth, naturalHeight });
  }

  #matrix?: DOMMatrix;

  #imageSize = signal({ naturalWidth: 0, naturalHeight: 0 });
  #cropBounds = signal(new DOMRectReadOnly());
  #maximumScale = computed(() =>
    Math.min(
      this.#imageSize().naturalWidth / this.#cropBounds().width,
      this.#imageSize().naturalHeight / this.#cropBounds().height
    )
  );
  // the scale the image is at when it is first loaded
  #initialScale = computed(() => 1 / this.#maximumScale());

  ngOnInit(): void {
    combineLatest([
      toObservable(this.#cropBounds, { injector: this.#injector }),
      toObservable(this.#imageSize, { injector: this.#injector }),
    ])
      .pipe(
        takeUntilDestroyed(this.#destoryRef),
        filter(() => this.#elementRef.nativeElement.complete)
      )
      .subscribe(([bounds, size]) => this.#fitImage(bounds, size));
  }

  _setCropBounds(bounds: DOMRectReadOnly) {
    this.#cropBounds.set(bounds);
  }

  #fitImage(cropBounds: DOMRectReadOnly, imageSize: ImageSize) {
    const { width, height } = cropBounds;
    if (width === 0 || height === 0) {
      return;
    }
    const { naturalWidth, naturalHeight } = imageSize;
    if (naturalWidth === 0 || naturalHeight === 0) {
      return;
    }
    const x = (width - naturalWidth) / 2;
    const y = (height - naturalHeight) / 2;

    this.#matrix = new DOMMatrix([
      this.#initialScale(),
      0,
      0,
      this.#initialScale(),
      x,
      y,
    ]);

    this.#setTransform(this.#matrix);
  }

  #setTransform(matrix?: DOMMatrix) {
    if (!matrix) {
      return;
    }
    this.#elementRef.nativeElement.style.transform = matrix.toString();
  }
}
