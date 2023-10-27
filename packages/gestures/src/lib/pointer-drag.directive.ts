import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { PointerTrackerFactory } from './pointer-tracker';

@Directive({
  selector: '[ngxPointerDrag]',
  standalone: true,
})
export class PointerDragDirective implements AfterViewInit {
  #destroyRef = inject(DestroyRef);
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);
  #pointerTrackerFactory = inject(PointerTrackerFactory);

  @Output() moveBy = new EventEmitter<{ deltaX: number; deltaY: number }>();

  ngAfterViewInit(): void {
    const element = this.#elementRef.nativeElement;
    const pointerTracker = this.#pointerTrackerFactory.attach(element);
    pointerTracker.start
      .pipe(
        takeUntilDestroyed(this.#destroyRef),
        filter(() => pointerTracker.pointers.size === 1),
        switchMap(() =>
          pointerTracker.move.pipe(
            takeUntil(pointerTracker.end),
            tap((event) => element.setPointerCapture(event.pointerId)),
            map(() => Array.from(pointerTracker.pointers.values())),
            map((pointers) => {
              return {
                deltaX: pointers[0].current.x - pointers[0].previous.x,
                deltaY: pointers[0].current.y - pointers[0].previous.y,
              };
            })
          )
        )
      )
      .subscribe((coords) => {
        this.moveBy.emit(coords);
      });
  }
}
