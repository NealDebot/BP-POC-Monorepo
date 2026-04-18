import { Component, effect, inject, OnInit } from '@angular/core';
import { SurveyModule } from 'survey-angular-ui';
import { Model } from 'survey-core';
import surveyJson from '../../../temp/survey.json';
import "survey-core/survey-core.min.css"
import { PraktijkService } from '../services/praktijk.service';

@Component({
  selector: 'app-survey-component',
  imports: [SurveyModule],
  templateUrl: './survey-component.html',
  styleUrl: './survey-component.css',
})
export class SurveyComponent {
  surveyModel!: Model;
  private praktijkService = inject(PraktijkService)
  public praktijk = this.praktijkService.praktijk
  constructor() {
    this.surveyModel = new Model(surveyJson);
    this.surveyModel.onComplete.add(this.surveyComplete);
    this.surveyModel.onComplete.add(this.alertResults);
    effect(() => {
      const p = this.praktijk();
      console.log(p?.betalingssysteem)
      this.surveyModel.setVariable('betalingssysteem', p?.betalingssysteem);
    });
  }

  surveyComplete(survey: Model){
    const userId = 1  //todo: get users id
    survey.setValue("userId", userId);
    //todo: send result to backend
  }

  alertResults(survey: Model){
    const results = JSON.stringify(survey.data)
    alert(results)
  }
}
