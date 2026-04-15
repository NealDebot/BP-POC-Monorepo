import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class PraktijkService {
  constructor(private httpClient: HttpClient) {}

  userSync(auth0_id: string): Observable<any> {
    return this.httpClient.post(baseURL + '/auth/sync', { auth0_id: auth0_id });
  }
}
