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
import { NgxAvatarEditorCanvasDirective } from './avatar-editor-canvas.directive';
import { NgxAvatarEditorZoomControlsComponent } from './avatar-editor-zoom-controls.component';
import { NgxAvatarEditorStore } from './avatar-editor.store';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [
    CommonModule,
    NgxAvatarEditorCanvasDirective,
    NgxAvatarEditorZoomControlsComponent,
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

  protected zoomBy(step: number): void {
    this._canvas._scaleBy(step);
  }

  protected zoomTo(value: number) {
    if (value === this.store.relativeScale()) {
      return;
    }
    this.zoomBy(value - this.store.relativeScale());
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
