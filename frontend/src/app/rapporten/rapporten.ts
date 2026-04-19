import { Component, effect, inject, signal } from '@angular/core';
import { Rapport } from '../interfaces/rapport';
import { PraktijkService } from '../services/praktijk.service';
import { RapportService } from '../services/rapport.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-rapporten',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './rapporten.html',
  styleUrl: './rapporten.css',
})
export class Rapporten {
  private praktijkService = inject(PraktijkService);
  private rapportService = inject(RapportService);
  public rapporten = signal<Rapport[]>([]);
  public selectedRapport = signal<Rapport | null>(null);

  constructor() {
    effect(() => {
      const p = this.praktijkService.praktijk();
      if (p) {
        this.rapportService.getRapporten(p.id).subscribe((data: Rapport[]) => {
          console.log(data);
          this.rapporten.set(data);
        });
      }
    });
  }
  selectRapport(rapport: Rapport) {
    this.selectedRapport.set(rapport);
  }
}
