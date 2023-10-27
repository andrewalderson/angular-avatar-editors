import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  inject,
  numberAttribute,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, map, tap } from 'rxjs';

export type WheelZoomEvent = {
  step: number;
  globalOrigin: DOMPointReadOnly;
};

@Directive({
  selector: '[ngxMouseWheelZoom]',
  standalone: true,
})
export class MouseWheelZoomDirective implements AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @Input({ transform: numberAttribute }) step = 0.1;

  @Output() zoomBy = new EventEmitter<WheelZoomEvent>();

  ngAfterViewInit(): void {
    const element = this.#elementRef.nativeElement;

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
              -1 *
              Math.sign(event.deltaY) *
              (event.ctrlKey ? this.step * 0.1 : this.step),
            globalOrigin: new DOMPointReadOnly(event.clientX, event.clientY),
          };
        })
      )
      .subscribe((zoom) => this.zoomBy.emit(zoom));
  }
}
