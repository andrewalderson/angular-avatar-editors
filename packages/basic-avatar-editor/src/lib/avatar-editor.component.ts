import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { NgxAvatarEditorImageDirective } from './avatar-editor-image.directive';

@Component({
  selector: 'ngx-avatar-editor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar-editor.component.html',
  styleUrls: ['./avatar-editor.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxAvatarEditorComponent implements AfterViewInit {
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostBinding('attr.tabIndex') _tabIndex = 0;

  @ContentChild(NgxAvatarEditorImageDirective)
  _image!: NgxAvatarEditorImageDirective;

  ngAfterViewInit(): void {
    const element = this.#elementRef.nativeElement;
    // TODO - need a resize observer for this
    this._image._setCropBounds(element.getBoundingClientRect());
  }
}
