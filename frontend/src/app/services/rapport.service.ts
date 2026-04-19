import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Rapport } from '../interfaces/rapport';

const baseURL = environment.api.baseURL;
@Injectable({
  providedIn: 'root',
})
export class RapportService {
  constructor(private httpClient: HttpClient) {}
  public getRapporten(praktijkId: string) {
    return this.httpClient.get<Rapport[]>(baseURL + '/rapport/' + praktijkId);
  }
}
