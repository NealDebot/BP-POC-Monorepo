import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vragenlijsten',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './vragenlijsten.html',
  styleUrl: './vragenlijsten.css',
})
export class Vragenlijsten {
  public vragenlijstenlist = vragenlijsten;
}
const vragenlijsten = [
  {
    id: 0,
    surveyId: 0,
    title: 'jaarlijkste vragenlijst',
    deadline: new Date(),
    status: 0,
  },
  {
    id: 1,
    surveyId: 1,
    title: '3 jaarlijkste vragenlijst',
    deadline: new Date(),
    status: 80,
  },
];
