import { Routes } from '@angular/router';
import { SurveyComponent } from '../survey-component/survey-component';
import { HomeComponent } from '../home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
  },
  {
    path: 'survey',
    component: SurveyComponent,
    title: 'Survey',
  },
];
