import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-disclamer',
  imports: [CommonModule],
  templateUrl: './disclamer.html',
  styleUrl: './disclamer.css',
})
export class Disclamer {
  public isVisible = signal(true);

  dismiss() {
    this.isVisible.set(false);
  }
}
