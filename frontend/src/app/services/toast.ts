import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  toasts = signal<{ message: string; duration: number; type: 'success' | 'error' }[]>([]);

  add(message: string, duration: number = 3000, type: 'success' | 'error' = 'success') {
    this.toasts.update((t) => [...t, { message, duration, type }]);
    setTimeout(() => this.remove(0), duration);
  }

  remove(index: number) {
    this.toasts.update((t) => t.filter((_, i) => i !== index));
  }
}
