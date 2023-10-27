import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MouseWheelZoomDirective, PointerDragDirective } from 'gestures';
import { NgxAvatarEditorImageDirective } from './avatar-editor-image.directive';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [CommonModule, NgxAvatarEditorImageDirective],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [MouseWheelZoomDirective, PointerDragDirective],
})
export class NgxAvatarEditorComponent implements AfterViewInit {
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  #pointerDrag = inject(PointerDragDirective, { self: true });
  #wheelZoom = inject(MouseWheelZoomDirective, { self: true });

  @HostBinding('attr.tabIndex') _tabIndex = 0;

  @Input({ required: true }) src!: string;

  @ViewChild(NgxAvatarEditorImageDirective)
  _image!: NgxAvatarEditorImageDirective;

  ngAfterViewInit(): void {
    const element = this.#elementRef.nativeElement;
    // TODO - need a resize observer for this
    this._image._setCropBounds(element.getBoundingClientRect());

    this.#wheelZoom.zoomBy.subscribe(({ step, globalOrigin }) =>
      this._image._scaleBy(step, globalOrigin)
    );

    this.#pointerDrag.moveBy.subscribe(({ deltaX, deltaY }) => {
      this._image._translateBy(deltaX, deltaY);
    });
  }
}
