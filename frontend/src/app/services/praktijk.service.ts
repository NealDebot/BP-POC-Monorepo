import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseURL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class PraktijkService {
  constructor(private httpClient: HttpClient) {}
  praktijk = signal<Praktijk | null>(null);

  userSync(auth0_id: string): Observable<any> {
    return this.httpClient.post(baseURL + '/auth/sync', { auth0_id: auth0_id });
  }
}

interface Praktijk {
  id: string;
  betalingssysteem?: string;
  e_mail?: string;
  multidisciplinair: boolean;
  netwerk_aantal?: number;
  netwerk_riziv: boolean;
  netwerk_type?: string;
  online_afspraken: boolean;
  patient_stop?: string;
  praktijkvorm?: string;
  telefoon_nummer?: string;
  telesecretariaat: boolean;
  adressen: Adres[];
  team: Team;
}

interface Team {
  id: number;
  coordinator_directeur: boolean;
  onthaal_administratief: boolean;
  verpleegkundige: boolean;
  dietist_voedingsdeskundige: boolean;
  kinesitherapeut_manueeltherapeut_osteopaat: boolean;
  sociaal_werker: boolean;
  podoloog: boolean;
  psycholoog: boolean;
  gezondheidspromoter: boolean;
  andere?: string;

  huisartsen: Huisarts[];
}

interface Huisarts {
  id: number;
  in_opleiding: boolean;
  email: string;
  rizivnr: string;
  geboortejaar: number;
  stopzetten: string;
}

interface Adres {
  id: number;
  straat: string;
  huisnr: string;
  postcode: string;
  Stad: string;
}
