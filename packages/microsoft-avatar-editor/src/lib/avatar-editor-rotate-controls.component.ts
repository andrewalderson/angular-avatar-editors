import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'ngx-avatar-editor-rotate-controls',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button (click)="updateRotation(-90)">
      <span class="cdk-visually-hidden"
        >Rotate 90 degrees counter clockwise</span
      >
      <mat-icon>rotate_90_degrees_ccw</mat-icon>
    </button>
    <mat-slider min="-45" max="45" [displayWith]="valueFormatFn">
      <input matSliderThumb value="0" (input)="rotationChangeHandler($event)" />
    </mat-slider>
    <button mat-icon-button (click)="updateRotation(90)">
      <span class="cdk-visually-hidden">Rotate 90 degrees clockwise</span>
      <mat-icon>rotate_90_degrees_cw</mat-icon>
    </button>
  `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxAvatarEditorRotateControlsComponent {
  #previousRotationSliderValue = 0;

  @Input() valueFormatFn = (value: number) => value.toString();

  @Output() rotateBy = new EventEmitter<number>();

  protected rotationChangeHandler(value: number): void;
  protected rotationChangeHandler(event: Event): void;
  protected rotationChangeHandler(eventOrValue: Event | number) {
    let value = 0;
    if (eventOrValue instanceof Event) {
      value = (eventOrValue.target as HTMLInputElement).valueAsNumber;
    } else {
      value = eventOrValue;
    }

    const delta = value - this.#previousRotationSliderValue;
    this.#previousRotationSliderValue = value;
    this.updateRotation(delta);
  }

  protected updateRotation(value: number) {
    this.rotateBy.emit(value);
  }
}
