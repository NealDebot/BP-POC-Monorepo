import { Routes } from '@angular/router';
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
    path: 'praktijkInformatie',
    component: PraktijkInfo,
    title: 'Praktijk Informatie',
    canActivate: [authGuard]
  }
];
