import { Component, effect, inject } from '@angular/core';
import { PraktijkService } from '../services/praktijk.service';
import { Praktijk } from '../interfaces/praktijk';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Toast } from '../services/toast';

@Component({
  selector: 'app-team-samenstelling',
  imports: [ReactiveFormsModule],
  templateUrl: './team-samenstelling.html',
  styleUrl: './team-samenstelling.css',
})
export class TeamSamenstelling {
  constructor() {
    effect(() => {
      const p = this.praktijk();
      if (p) this.initForm(p);
    });
  }
  private toastService = inject(Toast);
  private praktijkService = inject(PraktijkService);
  public praktijk = this.praktijkService.praktijk;
  public teamForm = new FormGroup({
    coordinator_directeur: new FormControl(false),
    onthaal_administratief: new FormControl(false),
    verpleegkundige: new FormControl(false),
    dietist_voedingsdeskundige: new FormControl(false),
    kinesitherapeut_manueeltherapeut_osteopaat: new FormControl(false),
    sociaal_werker: new FormControl(false),
    podoloog: new FormControl(false),
    psycholoog: new FormControl(false),
    gezondheidspromoter: new FormControl(false),
    andere: new FormControl(),
    huisartsen: new FormArray([]),
  });

  get huisartsen(): FormArray {
    return this.teamForm.get('huisartsen') as FormArray;
  }

  addHuisarts = () => {
    const huisarts = new FormGroup({
      in_opleiding: new FormControl(false),
      email: new FormControl(null, Validators.required),
      rizivnr: new FormControl(null, Validators.required),
      geboortejaar: new FormControl(null, Validators.required),
      stopzetten: new FormControl('Neen', Validators.required),
      adres: new FormControl(null, Validators.required),
    });
    this.huisartsen.push(huisarts);
  };

  removeHuisarts = (i: number) => {
    this.huisartsen.removeAt(i);
  };

  initForm = (p: Praktijk) => {
    this.teamForm.patchValue({
      coordinator_directeur: p.team.coordinator_directeur,
      andere: p.team.andere,
      dietist_voedingsdeskundige: p.team.dietist_voedingsdeskundige,
      gezondheidspromoter: p.team.gezondheidspromoter,
      kinesitherapeut_manueeltherapeut_osteopaat: p.team.kinesitherapeut_manueeltherapeut_osteopaat,
      podoloog: p.team.podoloog,
      psycholoog: p.team.psycholoog,
      onthaal_administratief: p.team.onthaal_administratief,
      sociaal_werker: p.team.sociaal_werker,
      verpleegkundige: p.team.verpleegkundige,
    });
    this.huisartsen.clear();
    for (const h of p.team.huisartsen) {
      this.huisartsen.push(
        new FormGroup({
          id: new FormControl(h.id),
          in_opleiding: new FormControl(h.in_opleiding),
          email: new FormControl(h.email, Validators.required),
          rizivnr: new FormControl(h.rizivnr, Validators.required),
          geboortejaar: new FormControl(h.geboortejaar, Validators.required),
          stopzetten: new FormControl(h.stopzetten, Validators.required),
          adres: new FormControl(h.adres.id, Validators.required),
        }),
      );
    }
  };

  save = () => {
    this.praktijkService.updateTeam(this.teamForm.value).subscribe({
      next: (data) => {
        this.praktijkService.praktijk.set(data.result);
        this.toastService.add('Opgeslagen');
      },
      error: (err) => {
        this.toastService.add('Er is iets fout gelopen', 3000, 'error');
      },
    });
  };
  reset = () => {
    const p = this.praktijk();
    if (p) this.initForm(p);
  };
}
