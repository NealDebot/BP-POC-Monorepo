import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Vragenlijsten } from '../vragenlijsten/vragenlijsten';
import { Rapporten } from '../rapporten/rapporten';

@Component({
  selector: 'app-home-component',
  imports: [NgClass, Vragenlijsten, Rapporten],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent {
  public tab: number = 1;
  changeTab(number: number) {
    this.tab = number;
  }
}
