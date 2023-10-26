import { Injectable } from '@angular/core';
import { filter, fromEventPattern, Observable, share, tap } from 'rxjs';

class Pointer {
  current: PointerEvent;
  previous: PointerEvent;
  initial: PointerEvent;

  constructor(event: PointerEvent) {
    this.initial = this.previous = this.current = event;
  }

  update(event: PointerEvent) {
    this.previous = this.current;
    this.current = event;
  }
}

class PointerTracker {
  readonly start: Observable<PointerEvent>;
  readonly move: Observable<PointerEvent>;
  readonly end: Observable<PointerEvent>;

  #pointers = new Map<number, Pointer>();

  /**
   * A map of PoniterEvent pointerId to Pointer instances
   */
  get pointers(): ReadonlyMap<number, Pointer> {
    return this.#pointers;
  }

  constructor(target: EventTarget) {
    this.start = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointerdown', handler),
      (handler) => target.removeEventListener('pointerdown', handler)
    ).pipe(
      tap((event: PointerEvent) => event.preventDefault()),
      tap((event: PointerEvent) => {
        this.#pointers.set(event.pointerId, new Pointer(event));
      }),
      share()
    );

    this.move = fromEventPattern<PointerEvent>(
      (handler) => target.addEventListener('pointermove', handler),
      (handler) => target.removeEventListener('pointermove', handler)
    ).pipe(
      tap((event: PointerEvent) => {
        const pointer = this.#pointers.get(event.pointerId);
        if (pointer) {
          pointer.update(event);
        }
      }),
      share()
    );

    this.end = fromEventPattern<PointerEvent>(
      (handler) => {
        target.addEventListener('pointerup', handler);
        target.addEventListener('pointercancel', handler);
      },
      (handler) => {
        target.removeEventListener('pointerup', handler);
        target.removeEventListener('pointercancel', handler);
      }
    ).pipe(
      tap((event: PointerEvent) => {
        this.#pointers.delete(event.pointerId);
      }),
      filter(() => this.#pointers.size === 0),
      share()
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class PointerTrackerFactory {
  #elementTrackerMap = new WeakMap<EventTarget, PointerTracker>();

  attach(target: EventTarget) {
    if (this.#elementTrackerMap.has(target)) {
      return this.#elementTrackerMap.get(target) as PointerTracker;
    }
    const tracker = new PointerTracker(target);
    this.#elementTrackerMap.set(target, tracker);
    return tracker;
  }

  detach(target: EventTarget) {
    if (this.#elementTrackerMap.has(target)) {
      this.#elementTrackerMap.delete(target);
    }
  }
}
