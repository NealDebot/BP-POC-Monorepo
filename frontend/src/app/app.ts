import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavBar } from './nav-bar/nav-bar';
import { PraktijkService } from './services/praktijk.service';
import {filter,take,switchMap} from 'rxjs'

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private praktijkService: PraktijkService) {}
  protected readonly window: Window = window;
  protected auth: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.auth.isLoading$
      .pipe(
        filter((loading) => !loading),
        take(1),
        switchMap(() => this.auth.isAuthenticated$),
        filter((isAuthenticated) => isAuthenticated),
        take(1),
        switchMap(() => this.auth.user$),
        switchMap((user) => this.praktijkService.userSync(user!.sub!)),
      )
      .subscribe(data => this.praktijkService.praktijk.set(data.data))
  }
}
