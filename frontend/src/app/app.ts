import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NavBar } from './nav-bar/nav-bar';
import { PraktijkService } from './services/praktijk.service';
import { filter, take, switchMap,of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { Toast } from './services/toast';
import { Disclamer } from './disclamer/disclamer';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, NavBar, Disclamer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(
    private praktijkService: PraktijkService,
    private router: Router,
  ) {}
  protected readonly window: Window = window;
  protected auth: AuthService = inject(AuthService);
  protected toastService: Toast = inject(Toast);

  ngOnInit(): void {
    this.auth.isLoading$
      .pipe(
        filter((loading) => !loading),
        take(1),
        switchMap(() => this.auth.isAuthenticated$),
        filter((isAuthenticated) => isAuthenticated),
        take(1),
        switchMap(()=> this.auth.getAccessTokenSilently().pipe(catchError((error)=>{
          if (error.error === 'login_required') {
            this.auth.loginWithRedirect();
            return of(null)
          }
          throw error;
        }))),
        take(1),
        switchMap(() => this.auth.user$),
        take(1),
        switchMap((user) => this.praktijkService.userSync(user!.sub!)),
        take(1)
      )
      .subscribe((data) => {
        // @ts-ignore
        if (!data.data.praktijk.betalingssysteem) {
          this.router.navigate(['/praktijkInformatie']);
        }
      });
  }
}
