import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class VragenlijstService {
  constructor(private httpClient: HttpClient) {}
  public getVragenlijsten= (praktijkId: string) => {
    return this.httpClient.get(baseURL + '/vragenlijst/' + praktijkId);
  }
}
