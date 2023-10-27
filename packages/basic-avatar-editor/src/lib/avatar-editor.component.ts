import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MouseWheelZoomDirective, PointerTrackerFactory } from 'gestures';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs';
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
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  #pointerTrackerFactory = inject(PointerTrackerFactory);
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

    const pointerTracker = this.#pointerTrackerFactory.attach(element);
    pointerTracker.start
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter(() => pointerTracker.pointers.size === 1),
        switchMap(() =>
          pointerTracker.move.pipe(
            takeUntil(pointerTracker.end),
            tap((event) => element.setPointerCapture(event.pointerId)),
            map(() => Array.from(pointerTracker.pointers.values()))
          )
        )
      )
      .subscribe((pointers) => {
        const deltaX = pointers[0].current.x - pointers[0].previous.x;
        const deltaY = pointers[0].current.y - pointers[0].previous.y;

        this._image._translateBy(deltaX, deltaY);
      });
  }
}
