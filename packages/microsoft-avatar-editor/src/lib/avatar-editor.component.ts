import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  computed,
  inject,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import {
  MouseWheelZoomDirective,
  PointerDragDirective,
  WheelZoomEvent,
} from 'gestures';
import { NgxAvatarEditorCanvasDirective } from './avatar-editor-canvas.directive';
import { NgxAvatarEditorRotateControlsComponent } from './avatar-editor-rotate-controls.component';
import { NgxAvatarEditorZoomControlsComponent } from './avatar-editor-zoom-controls.component';
import { NgxAvatarEditorStore } from './avatar-editor.store';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [
    CommonModule,
    NgxAvatarEditorCanvasDirective,
    NgxAvatarEditorZoomControlsComponent,
    NgxAvatarEditorRotateControlsComponent,
    MatTabsModule,
    PointerDragDirective,
    MouseWheelZoomDirective,
  ],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxAvatarEditorStore],
})
export class NgxAvatarEditorComponent implements AfterViewInit {
  protected store = inject(NgxAvatarEditorStore);

  @Input({ required: true }) src!: string;

  @ViewChild(NgxAvatarEditorCanvasDirective)
  _canvas!: NgxAvatarEditorCanvasDirective;

  protected rotateValueFormatFn = (value: number) => `${value}º`;

  protected zoomValueFormatFn = (value: number) => `${value}%`;
  protected minZoom = 100;
  protected maxZoom = computed(() =>
    Math.round(this.store.maximumScale() * 100)
  );
  protected zoomValue = computed(() =>
    Math.round(
      this.minZoom +
        (this.maxZoom() - this.minZoom) * this.store.relativeScale()
    )
  );

  protected canDecrementZoom = computed(() => this.zoomValue() > this.minZoom);
  protected canIncrementZoom = computed(
    () => this.zoomValue() < this.maxZoom()
  );

  protected zoomBy(step: number): void;
  protected zoomBy(wheelZoom: WheelZoomEvent): void;
  protected zoomBy(stepOrEvent: number | WheelZoomEvent): void {
    if (typeof stepOrEvent === 'object') {
      const { step, globalOrigin } = stepOrEvent;
      this._canvas._scaleBy(step, globalOrigin);
    } else {
      this._canvas._scaleBy(stepOrEvent);
    }
  }

  protected zoomTo(value: number) {
    if (value === this.store.relativeScale()) {
      return;
    }
    this.zoomBy(value - this.store.relativeScale());
  }

  protected rotateBy(delta: number) {
    this._canvas._rotateBy(delta);
  }

  protected moveBy(point: { deltaX: number; deltaY: number }) {
    this._canvas._translateBy(point.deltaX, point.deltaY);
  }
  ngAfterViewInit(): void {
    // TODO - need a resize observer for this element
    const canvasElement = this._canvas._hostElement;
    const bounds = canvasElement.getBoundingClientRect();
    // need to explitly set these because we are sizing things with css
    canvasElement.width = bounds.width;
    canvasElement.height = bounds.height;
    this.store.cropBounds.set(bounds);
  }
}
