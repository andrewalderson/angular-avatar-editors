import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MouseWheelZoomDirective } from 'gestures';
import { NgxAvatarEditorImageDirective } from './avatar-editor-image.directive';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [CommonModule, NgxAvatarEditorImageDirective],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MouseWheelZoomDirective],
})
export class NgxAvatarEditorComponent implements AfterViewInit {
  #wheelZoom = inject(MouseWheelZoomDirective, { self: true });

  @Input({ required: true }) src!: string;

  @ViewChild('canvas') _canvas!: ElementRef<HTMLElement>;

  @ViewChild(NgxAvatarEditorImageDirective)
  _image!: NgxAvatarEditorImageDirective;

  ngAfterViewInit(): void {
    const canvasElement = this._canvas.nativeElement;

    this._image._setCropBounds(canvasElement.getBoundingClientRect());

    this.#wheelZoom.zoomBy.subscribe(({ step, globalOrigin }) =>
      this._image._scaleBy(step, globalOrigin)
    );
  }
}
