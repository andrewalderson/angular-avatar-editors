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
  // absolute scale is a value between 1 and maximumScale
  // we start at 1 because this is used as a multiplier
  readonly absoluteScale = signal(1);
}
