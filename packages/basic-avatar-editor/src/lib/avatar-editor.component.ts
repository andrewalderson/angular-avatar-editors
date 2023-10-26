import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, tap } from 'rxjs';
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
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostBinding('attr.tabIndex') _tabIndex = 0;

  @ContentChild(NgxAvatarEditorImageDirective)
  _image!: NgxAvatarEditorImageDirective;

  ngAfterViewInit(): void {
    const element = this.#elementRef.nativeElement;
    // TODO - need a resize observer for this
    this._image._setCropBounds(element.getBoundingClientRect());

    fromEvent<WheelEvent>(element, 'wheel', {
      passive: false,
      capture: true,
    })
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        tap((event: WheelEvent) => event.preventDefault()),
        map((event: WheelEvent) => {
          /**
           * touchpad wheel will have the ctrlKey set to true
           * We need to zoom in smaller increments on a trackpad to give
           * the user more control
           * Yes, a user could use a mouse wheel with the ctrl key also
           * but they could also just take their finger off of the key
           *
           * The deltaY can be different depending on the device
           * manufacturer and the browser vendor
           * Math.sign will normalize it to a value of either -1, 0 or 1
           */
          return {
            step:
              -1 * Math.sign(event.deltaY) * (event.ctrlKey ? 0.1 * 0.1 : 0.1),
            origin: new DOMPointReadOnly(event.clientX, event.clientY),
          };
        })
      )
      .subscribe(({ step, origin }) => this._image._scaleBy(step, origin));
  }
}
