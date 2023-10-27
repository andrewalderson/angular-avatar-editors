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
import { combineLatest, filter, tap } from 'rxjs';

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

  #cropBoundsCenter = computed(
    () =>
      new DOMPointReadOnly(
        this.#cropBounds().left + this.#cropBounds().width / 2,
        this.#cropBounds().top + this.#cropBounds().height / 2
      )
  );
  // the maximum scale that the matrix can be scaled to
  // a value of 1 will scale the image to its natural width and height
  // we could make this customizable if we want to scale larger
  #maxScale = 1;
  // the scale the image is at when it is first loaded
  #minScale = computed(
    () =>
      1 /
      Math.min(
        this.#imageSize().naturalWidth / this.#cropBounds().width,
        this.#imageSize().naturalHeight / this.#cropBounds().height
      )
  );
  #currentScale = 0;

  ngOnInit(): void {
    combineLatest([
      toObservable(this.#cropBounds, { injector: this.#injector }),
      toObservable(this.#imageSize, { injector: this.#injector }),
    ])
      .pipe(
        takeUntilDestroyed(this.#destoryRef),
        filter(() => this.#elementRef.nativeElement.complete),
        tap(() => (this.#currentScale = this.#minScale()))
      )
      .subscribe(([bounds, size]) => this.#fitImage(bounds, size));
  }

  _setCropBounds(bounds: DOMRectReadOnly) {
    this.#cropBounds.set(bounds);
  }

  /**
   * Scales the image by a relative value optionally at a specified point on the image
   * @param step The delta value to apple to the scale - positive means scale up and negative means scale down
   * @param globalOrigin A point in global cartesian coordinates to apply the scale at. These will be converted to coodinates centered on the image
   */
  _scaleBy(step: number, globalOrigin?: DOMPointReadOnly) {
    // translate the step, which is positive or negative to a scale centered on 1
    // when scaling a matrix '1' is the default scale so passing a 1 to the scale method
    // would not scale the matrix
    // we also clamp the scale so that the image will never be scaled less
    // than its original scale or more than its natural width and height (a scale of 1)
    const scale = this.#clamp(
      1 + step,
      this.#minScale() / this.#currentScale,
      this.#maxScale / this.#currentScale
    );

    const image = this.#elementRef.nativeElement;
    const currentImageBounds: DOMRectReadOnly = image.getBoundingClientRect();

    // the center of the image in global (client) coordinates
    const currentImageCenter = new DOMPointReadOnly(
      currentImageBounds.left + currentImageBounds.width / 2,
      currentImageBounds.top + currentImageBounds.height / 2
    );

    // if the global coordinates are defined then we need to convert them
    // to coordinates we can use to transform the image
    // The coordinates will be in Cartesian coordinates with 0, 0 in the top left corner
    // CSS transforms use the center of the element as the transform origin by default
    // so the coordinates need to be converted to ones centered on the image
    let { x: tx, y: ty } = !globalOrigin
      ? new DOMPointReadOnly()
      : globalOrigin.matrixTransform(
          new DOMMatrix()
            // the globalOrigin is in global (client) coordinates
            // they need to be converted to local image coordinates with 0,0 at the center.
            // After scale and rotation and inversion the tx and ty will be a point on the
            // image at the images unscaled and unrotated size (positive or negative naturalWidth / 2 and naturalHeight / 2)
            // we do clamp the values below to ensure they are actually a point on the image
            // positive tx value is to the right of center
            // negative tx value is to the left of center
            // positive ty value is below center
            // negative ty value is above center
            .translateSelf(currentImageCenter.x, currentImageCenter.y)
            .scaleSelf(this.#currentScale)
            .invertSelf()
        );

    // we are clamping these values to be a point on the image at fullsize
    // this is because we don't know what element initiated this scale and
    // if the translation point is outside the bounds of the image it will
    // cause the image to shift around when scaling down
    // and also potentially cause one of the edges of the image to be
    // inside the bounds of the parent canvas element
    tx = this.#clamp(tx, (-1 * image.naturalWidth) / 2, image.naturalWidth / 2);
    ty = this.#clamp(
      ty,
      (-1 * image.naturalHeight) / 2,
      image.naturalHeight / 2
    );

    this.#matrix?.scaleSelf(scale, scale, undefined, tx, ty);

    // if we are scaling the image down we need to ensure that any side of the image
    // will not be inside any side of the parent canvas
    if (step < 0) {
      // we need to calculate where the image center will be after the matrix is applied
      // and ensure it is inside the maximum bounds that it can be in
      // we are using the center instead of a corner because the center
      // is where the transform origin is

      // If I took more math in school I probably could make the translation
      // of the current image center to the next image center a lot cleaner
      // and do it with one matrix transform
      // TODO - learn more math
      const scaledImageWidth = image.naturalWidth * this.#currentScale;
      const scaledImageHeight = image.naturalHeight * this.#currentScale;
      const scaledImageCenter = new DOMPointReadOnly(
        scaledImageWidth / 2,
        scaledImageHeight / 2
      );
      const nextScaledImageWidth = scaledImageWidth * scale;
      const nextScaledImageHeight = scaledImageHeight * scale;

      // the change in the image size as a percentage
      const imageChangeWidthPercentage =
        (scaledImageWidth - nextScaledImageWidth) / scaledImageWidth;
      const imageChangeHeightPercentage =
        (scaledImageHeight - nextScaledImageHeight) / scaledImageHeight;

      // the distance from the image center to the origin point in unscaled image coordinates as a percent
      // and rotated - rotation ensures that it uses the distance on the image and not on the screen
      const unscaledTranslatePercentageFromCenter = new DOMPointReadOnly(
        tx / (image.naturalWidth / 2),
        ty / (image.naturalHeight / 2)
      );

      // where the element center will be after the transform
      // if tx and ty are not adjusted
      const nextElementCenter = currentImageCenter.matrixTransform(
        new DOMMatrix().translateSelf(
          scaledImageCenter.x *
            unscaledTranslatePercentageFromCenter.x *
            imageChangeWidthPercentage,
          scaledImageCenter.y *
            unscaledTranslatePercentageFromCenter.y *
            imageChangeHeightPercentage
        )
      );

      // the maximum positive and negative x and y positions the the image center point
      // can be within so that all of its sides are outside all of the sides of the canvas
      // if the center is outside of these bounds then we need to adjust tx and ty
      // this area is relative to the center of the parent element
      // it grows and shrinks as we scale but its center is always
      // the same as the parent element center
      const imageCenterMaximumBounds = new DOMRectReadOnly(
        (this.#cropBounds().width - nextScaledImageWidth) / 2,
        (this.#cropBounds().height - nextScaledImageHeight) / 2,
        nextScaledImageWidth - this.#cropBounds().width,
        nextScaledImageHeight - this.#cropBounds().height
      );

      // where the image center point will be after the transform is applied
      // relative to the center of the parent element
      const { x: cx, y: cy } = nextElementCenter.matrixTransform(
        new DOMMatrix()
          .translateSelf(this.#cropBoundsCenter().x, this.#cropBoundsCenter().y)
          .invertSelf()
      );

      let ax = 0;
      let ay = 0;
      if (cx < imageCenterMaximumBounds.left) {
        ax = imageCenterMaximumBounds.left - cx;
      }
      if (cx > imageCenterMaximumBounds.right) {
        ax = imageCenterMaximumBounds.right - cx;
      }
      if (cy < imageCenterMaximumBounds.top) {
        ay = imageCenterMaximumBounds.top - cy;
      }
      if (cy > imageCenterMaximumBounds.bottom) {
        ay = imageCenterMaximumBounds.bottom - cy;
      }

      // where will this point be after the scale is applied
      const { x, y } = new DOMPointReadOnly(ax, ay).matrixTransform(
        new DOMMatrix().scaleSelf(this.#currentScale * scale).invertSelf()
      );

      this.#matrix?.translateSelf(x, y);
    }

    this.#currentScale *= scale;
    this.#setTransform(this.#matrix);
  }

  _translateBy(deltaX: number, deltaY: number) {
    // this should never happen but it keeps TypeScript happy
    // when we spread the matrix values below
    if (!this.#matrix) {
      return;
    }
    // when we apply the 'translateSelf' to the matrix the tx and ty will be
    // multiplied by any existing scale and rotation
    // so need to put the deltaX and deltaY into unscaled space
    const { a, b, c, d } = this.#matrix;
    let { x: tx, y: ty } = new DOMPoint(deltaX, deltaY).matrixTransform(
      new DOMMatrix([a, b, c, d, 0, 0]).invertSelf()
    );
    const image = this.#elementRef.nativeElement;
    const currentImageBounds: DOMRectReadOnly = image.getBoundingClientRect();

    const scaledImageWidth = image.naturalWidth * this.#currentScale;
    const scaledImageHeight = image.naturalHeight * this.#currentScale;

    const currentImageCenter = new DOMPoint(
      currentImageBounds.left + currentImageBounds.width / 2,
      currentImageBounds.top + currentImageBounds.height / 2
    );

    const imageCenterBoundsHalfWidth =
      (scaledImageWidth - this.#cropBounds().width) / 2;
    const imageCenterBoundsHalfHeight =
      (scaledImageHeight - this.#cropBounds().height) / 2;

    // The current x and y of the center of the image as it is dragged around
    // when they are in the same place cx and cy will be 0
    // The distance that the image can be dragged is
    // the parent canvas center x plus or minus the imageCenterBoundsHalfWidth and
    // the parent canvas y plus or minus the imageCenterBoundsHalfHeight
    const { x: cx, y: cy } = currentImageCenter.matrixTransform(
      new DOMMatrix()
        .translateSelf(this.#cropBoundsCenter().x, this.#cropBoundsCenter().y)
        .invertSelf()
    );

    tx = this.#clamp(
      tx,
      -1 * (imageCenterBoundsHalfWidth + cx),
      imageCenterBoundsHalfWidth - cx
    );
    ty = this.#clamp(
      ty,
      -1 * (imageCenterBoundsHalfHeight + cy),
      imageCenterBoundsHalfHeight - cy
    );

    this.#matrix?.translateSelf(tx, ty);

    return this.#setTransform(this.#matrix);
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
      this.#minScale(),
      0,
      0,
      this.#minScale(),
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

  #clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
  }
}
