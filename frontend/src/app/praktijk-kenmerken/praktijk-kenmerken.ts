import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PraktijkService } from '../services/praktijk.service';
import { Praktijk } from '../interfaces/praktijk';

@Component({
  selector: 'app-praktijk-kenmerken',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './praktijk-kenmerken.html',
  styleUrl: './praktijk-kenmerken.css',
})
export class PraktijkKenmerken {
  private praktijkService = inject(PraktijkService);
  public praktijk = this.praktijkService.praktijk;
  public praktijkKenmerkenForm = new FormGroup({
    praktijkvorm: new FormControl(),
    betalingssysteem: new FormControl(),
    patient_stop: new FormControl(),
    online_afspraken: new FormControl(),
    multidisciplinair: new FormControl(),
    telesecretariaat: new FormControl(),
    netwerk_type: new FormControl(),
    netwerk_aantal: new FormControl(),
    netwerk_riziv: new FormControl(),
  });
  private netwerk_typeArray: string[] = [];

  constructor() {
    effect(() => {
      const p = this.praktijk();
      if (p) {
        this.initForm(p);
      }
    });
  }

  private initForm = (p: Praktijk) => {
    this.praktijkKenmerkenForm.patchValue({
      telesecretariaat: p.telesecretariaat,
      betalingssysteem: p.betalingssysteem,
      multidisciplinair: p.multidisciplinair,
      netwerk_aantal: p.netwerk_aantal,
      netwerk_riziv: p.netwerk_riziv,
      online_afspraken: p.online_afspraken,
      patient_stop: p.patient_stop,
      praktijkvorm: p.praktijkvorm,
    });
    if (p.netwerk_type) {
      this.netwerk_typeArray = p.netwerk_type.split(';');
    } else {
      this.netwerk_typeArray = [];
    }
  };

  updateNetwerk_type = (string: string) => {
    let result: string[] = this.netwerk_typeArray;
    if (this.netwerk_typeArray.includes(string)) {
      result = this.netwerk_typeArray.filter((str) => str !== string);
    } else {
      if (string === 'Geen samenwerking') {
        result = ['Geen samenwerking'];
      } else {
        if (result.length === 1 && result[0] === 'Geen samenwerking') {
          result.pop();
        }
        result.push(string);
      }
    }
    this.netwerk_typeArray = result;
  };

  netwerk_typeChecked = (string: string) => {
    return this.netwerk_typeArray.includes(string);
  };

  save = () => {
    const typestring = this.netwerk_typeArray.join(';');
    this.praktijkKenmerkenForm.controls.netwerk_type.setValue(typestring);
    this.praktijkService
      .updateKenmerken(this.praktijkKenmerkenForm.value)
      .subscribe((data) => this.praktijkService.praktijk.set(data.result));
  };
  reset = () => {
    const p = this.praktijkService.praktijk();
    if (p) this.initForm(p);
  };
}
