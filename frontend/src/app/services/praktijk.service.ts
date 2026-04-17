import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Praktijk } from '../interfaces/praktijk';

const baseURL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class PraktijkService {
  constructor(private httpClient: HttpClient) {}
  praktijk = signal<Praktijk | null>(null);

  userSync(auth0_id: string): Observable<any> {
    return this.httpClient.post(baseURL + '/auth/sync', { auth0_id: auth0_id }).pipe(
      tap((response: any) => {
        this.praktijk.set(response.data.praktijk);
      }),
    );
  }

  updateAlgemeneInfo(data: any): Observable<any> {
    return this.httpClient.patch(baseURL + '/praktijk/' + this.praktijk()!.id + '/algemeen', data);
  }

  updateKenmerken(data: any): Observable<any> {
    return this.httpClient.patch(baseURL + '/praktijk/' + this.praktijk()!.id + '/kenmerken', data);
  }
}
