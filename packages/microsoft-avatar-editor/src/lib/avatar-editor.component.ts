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
import { NgxAvatarEditorCanvasDirective } from './avatar-editor-canvas.directive';
import { NgxAvatarEditorStore } from './avatar-editor.store';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [CommonModule, NgxAvatarEditorCanvasDirective],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NgxAvatarEditorStore],
})
export class NgxAvatarEditorComponent implements AfterViewInit {
  #store = inject(NgxAvatarEditorStore);

  @Input({ required: true }) src!: string;

  @ViewChild(NgxAvatarEditorCanvasDirective, {
    read: ElementRef<HTMLCanvasElement>,
  })
  _canvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    // TODO - need a resize observer for this element
    const canvasElement = this._canvas.nativeElement;
    const bounds = canvasElement.getBoundingClientRect();
    // need to explitly set these because we are sizing things with css
    canvasElement.width = bounds.width;
    canvasElement.height = bounds.height;
    this.#store.cropBounds.set(bounds);
  }
}
