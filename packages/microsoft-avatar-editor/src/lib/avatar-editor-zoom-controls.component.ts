import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  numberAttribute,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'ngx-avatar-editor-zoom-controls',
  standalone: true,
  imports: [CommonModule, MatSliderModule, MatButtonModule, MatIconModule],
  template: `
    <button mat-icon-button [disabled]="!canDecrement" (click)="decrement()">
      <span class="cdk-visually-hidden">Zoom Out</span>
      <mat-icon>remove_circle_outline</mat-icon>
    </button>
    <mat-slider [min]="minZoom" [max]="maxZoom" [displayWith]="valueFormatFn">
      <input
        matSliderThumb
        [value]="zoomValue"
        (input)="updateZoom($event)"
        (valueChange)="updateZoom($event)"
      />
    </mat-slider>
    <button mat-icon-button [disabled]="!canIncrement" (click)="increment()">
      <span class="cdk-visually-hidden">Zoom In</span>
      <mat-icon>add_circle_outline</mat-icon>
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
export class NgxAvatarEditorZoomControlsComponent {
  @Input() valueFormatFn = (value: number) => value.toString();

  @Output() zoomBy = new EventEmitter<number>();
  @Output() zoomTo = new EventEmitter<number>();

  @Input({ transform: numberAttribute, required: true }) minZoom!: number;
  @Input({ transform: numberAttribute, required: true }) maxZoom!: number;
  @Input({ transform: numberAttribute, required: true }) zoomValue!: number;

  @Input({ transform: numberAttribute, required: true }) zoomStepValue!: number;

  @Input({ transform: booleanAttribute, required: true })
  canDecrement!: boolean;
  @Input({ transform: booleanAttribute, required: true })
  canIncrement!: boolean;

  protected increment() {
    this.zoomBy.emit(this.zoomStepValue);
  }

  protected decrement() {
    this.zoomBy.emit(-1 * this.zoomStepValue);
  }

  protected updateZoom(value: number): void;
  protected updateZoom(event: Event): void;
  protected updateZoom(eventOrValue: Event | number) {
    let value = 0;
    if (eventOrValue instanceof Event) {
      value = (eventOrValue.target as HTMLInputElement).valueAsNumber;
    } else {
      value = eventOrValue;
    }
    const percentage = (value - this.minZoom) / (this.maxZoom - this.minZoom);

    this.zoomTo.emit(percentage);
  }
}
