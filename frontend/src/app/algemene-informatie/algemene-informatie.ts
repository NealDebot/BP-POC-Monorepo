import { Component, effect, inject } from '@angular/core';
import { PraktijkService } from '../services/praktijk.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Praktijk } from '../interfaces/praktijk';
import { Toast } from '../services/toast';

@Component({
  selector: 'app-algemene-informatie',
  imports: [ReactiveFormsModule],
  templateUrl: './algemene-informatie.html',
  styleUrl: './algemene-informatie.css',
})
export class AlgemeneInformatie {
  constructor() {
    effect(() => {
      const p = this.praktijk();
      if (p && this.adressen.length === 0) this.initForm(p);
    });
  }
  private toastService = inject(Toast);
  private praktijkService = inject(PraktijkService);
  public praktijk = this.praktijkService.praktijk;
  public algemeneInfoForm = new FormGroup({
    telefoon_nummer: new FormControl(this.praktijk()?.telefoon_nummer, [
      Validators.pattern(
        '(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})',
      ),
    ]),
    e_mail: new FormControl(this.praktijk()?.e_mail, [Validators.email]),
    adressen: new FormArray([]),
  });

  get adressen(): FormArray {
    return this.algemeneInfoForm.get('adressen') as FormArray;
  }

  addAdres = () => {
    const adres = new FormGroup({
      straat: new FormControl('', Validators.required),
      huisnr: new FormControl('', Validators.required),
      postcode: new FormControl('', Validators.required),
      Stad: new FormControl('', Validators.required),
    });
    this.adressen.push(adres);
  };

  removeAdres = (i: number) => {
    this.adressen.removeAt(i);
  };

  save = () => {
    this.praktijkService.updateAlgemeneInfo(this.algemeneInfoForm.value).subscribe({
      next: (data) => {
        this.praktijkService.praktijk.set(data.data);
        this.toastService.add('Opgeslagen');
      },
      error: (err) => {
        this.toastService.add('Er is iets fout gelopen');
      },
    });
  };
  cancel = () => {
    const p = this.praktijkService.praktijk();
    if (p) this.initForm(p);
  };

  private initForm(p: Praktijk) {
    this.algemeneInfoForm.patchValue({
      telefoon_nummer: p.telefoon_nummer,
      e_mail: p.e_mail,
    });

    this.adressen.clear();
    for (const a of p.adressen) {
      this.adressen.push(
        new FormGroup({
          id: new FormControl(a.id),
          straat: new FormControl(a.straat, Validators.required),
          huisnr: new FormControl(a.huisnr, Validators.required),
          postcode: new FormControl(a.postcode, Validators.required),
          Stad: new FormControl(a.Stad, Validators.required),
        }),
      );
    }
  }
}
