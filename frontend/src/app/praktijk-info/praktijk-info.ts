import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { AlgemeneInformatie } from '../algemene-informatie/algemene-informatie';

@Component({
  selector: 'app-praktijk-info',
  imports: [NgClass, AlgemeneInformatie],
  templateUrl: './praktijk-info.html',
  styleUrl: './praktijk-info.css',
})
export class PraktijkInfo {
  public tab: number = 1;

  changeTab(number: number) {
    this.tab = number;
  }
}
