import { Team } from './team';
import { Adres } from './adres';

export interface Praktijk {
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
