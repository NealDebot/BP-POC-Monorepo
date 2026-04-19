import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

const baseURL = environment.api.baseURL;
@Injectable({
  providedIn: 'root',
})
export class VragenlijstService {
  constructor(private httpClient: HttpClient) {}
  public getVragenlijsten = (praktijkId: string) => {
    return this.httpClient.get(baseURL + '/vragenlijst/' + praktijkId);
  };

  public saveAntwoord = (data: any) => {
    return this.httpClient.put(baseURL + '/vragenlijst/', data);
  };
}
