import { Routes } from '@angular/router';
import { SurveyComponent } from './survey-component/survey-component';
import { HomeComponent } from './home-component/home-component';
import { authGuard } from './auth-guard';
import { PraktijkInfo } from './praktijk-info/praktijk-info';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home',
    canActivate: [authGuard],
  },
  {
    path: 'survey',
    component: SurveyComponent,
    title: 'Survey',
    canActivate: [authGuard],
  },
  {
    path: 'praktijkInformatie',
    component: PraktijkInfo,
    title: 'Praktijk Informatie',
    canActivate: [authGuard]
  }
];
