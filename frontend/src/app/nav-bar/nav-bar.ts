import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {
  protected auth: AuthService = inject(AuthService);

  logout(): void {
    this.auth.logout({logoutParams: {returnTo: window.location.origin + "/BP-POC-Monorepo/"}});
  }
}
