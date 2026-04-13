import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavBar } from '../nav-bar/nav-bar';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly window: Window = window;
  protected auth: AuthService = inject(AuthService);
}
