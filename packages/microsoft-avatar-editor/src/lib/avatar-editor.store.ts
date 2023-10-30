import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class NgxAvatarEditorStore {
  readonly imageSize = signal({ naturalWidth: 0, naturalHeight: 0 });
  readonly cropBounds = signal(new DOMRectReadOnly());

  readonly initialScale = computed(() => 1 / this.maximumScale());
  // the maximum scale the image can be to be at its natural width and height
  readonly maximumScale = computed(() => {
    return Math.min(
      this.imageSize().naturalWidth / this.cropBounds().width,
      this.imageSize().naturalHeight / this.cropBounds().height
    );
  });

  readonly relativeScale = signal(0);
  // absolute scale is the current scale of the image as a value between 1 and maximumScale
  readonly absoluteScale = computed(() =>
    Math.exp(this.relativeScale() * Math.log(this.maximumScale()))
  );

  readonly absoluteRotation = signal(0);

  readonly zoomStepSize = computed(() =>
    Math.min(
      1,
      Math.max(
        0.01,
        Math.min(this.cropBounds().width, this.cropBounds().height) /
          (2 *
            Math.max(
              this.imageSize().naturalWidth,
              this.imageSize().naturalHeight
            ))
      )
    )
  );

  // the imageWidth and imageHeight is the size the image is drawn at in the canvas
  readonly imageWidth = computed(
    () =>
      (this.imageSize().naturalWidth * this.absoluteScale()) /
      this.maximumScale()
  );

  readonly imageHeight = computed(
    () =>
      (this.imageSize().naturalHeight * this.absoluteScale()) /
      this.maximumScale()
  );
}
