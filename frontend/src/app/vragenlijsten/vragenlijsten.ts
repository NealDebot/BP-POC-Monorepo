import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PraktijkService } from '../services/praktijk.service';
import { VragenlijstService } from '../services/vragenlijst.service';

@Component({
  selector: 'app-vragenlijsten',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './vragenlijsten.html',
  styleUrl: './vragenlijsten.css',
})
export class Vragenlijsten {
  constructor() {
    effect(() => {
      const p = this.praktijkService.praktijk();
      if (p) {
        this.vragenlijstService
          .getVragenlijsten(p.id)
          .subscribe((data: any) => this.vragenlijsten.set(data));
      }
    });
  }
  private praktijkService = inject(PraktijkService);
  private vragenlijstService = inject(VragenlijstService);
  public vragenlijsten = signal<{
    newVragenlijsten: Vragenlijst[];
    antwoorden: Antwoorden[];
  } | null>(null);
}
