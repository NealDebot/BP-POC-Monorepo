import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PraktijkService } from '../services/praktijk.service';
import { VragenlijstService } from '../services/vragenlijst.service';
import { Model } from 'survey-core';
import { SurveyModule } from 'survey-angular-ui';
import { Toast } from '../services/toast';
import 'survey-core/survey-core.min.css';

@Component({
  selector: 'app-vragenlijsten',
  imports: [CommonModule, SurveyModule],
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
  private toastService = inject(Toast);
  private praktijkService = inject(PraktijkService);
  private vragenlijstService = inject(VragenlijstService);
  public vragenlijsten = signal<{
    newVragenlijsten: Vragenlijst[];
    antwoorden: Antwoorden[];
  } | null>(null);
  public isModalOpen = signal(false);
  public activeSurvey = signal<Model | null>(null);
  public activeVragenlijstId = signal<number | null>(null);
  public activeAntwoordenId = signal<number | null>(null);

  openSurvey(vragenlijst: Vragenlijst) {
    const survey = new Model(JSON.parse(vragenlijst.json));
    survey.onComplete.add((sender) => {
      console.log('Survey completed:', sender.data);
      this.closeModal();
    });
    survey.setVariable('betalingssysteem', this.praktijkService.praktijk()?.betalingssysteem);
    this.activeSurvey.set(survey);
    this.activeVragenlijstId.set(vragenlijst.id);
    this.isModalOpen.set(true);
  }
  hervatSurvey(antwoord: Antwoorden) {
    const survey = new Model(JSON.parse(antwoord.vragenlijst.json));
    survey.data = JSON.parse(antwoord.antwoorden);
    survey.onComplete.add(() => {
      this.closeModal();
    });
    survey.setVariable('betalingssysteem', this.praktijkService.praktijk()?.betalingssysteem);
    this.activeSurvey.set(survey);
    this.activeVragenlijstId.set(antwoord.id);
    this.isModalOpen.set(true);
    this.activeAntwoordenId.set(antwoord.id);
  }

  closeModal() {
    this.save();
    this.isModalOpen.set(false);
    this.activeSurvey.set(null);
    this.activeVragenlijstId.set(null);
    this.activeAntwoordenId.set(null);
  }

  save() {
    const antwoorden = JSON.stringify(this.activeSurvey()?.data);
    const progress = this.activeSurvey()?.getProgress();
    const praktijkId = this.praktijkService.praktijk()?.id;
    this.vragenlijstService
      .saveAntwoord({
        antwoorden: antwoorden,
        vooruitgang: progress,
        praktijk_id: praktijkId,
        vragenlijst_id: this.activeVragenlijstId(),
        id: this.activeAntwoordenId(),
      })
      .subscribe({
        next: (data: any) => {
          this.vragenlijsten.set(data);
          this.toastService.add('Antwoorden Opgeslagen');
        },
        error: (error) => {
          this.toastService.add(
            'Er liep iets fout bij het opslaan van de antwoorden',
            3000,
            'error',
          );
        },
      });
  }
}
