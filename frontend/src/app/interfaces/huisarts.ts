import { Adres } from './adres';

export interface Huisarts {
  id: number;
  in_opleiding: boolean;
  email: string;
  rizivnr: string;
  geboortejaar: number;
  stopzetten: string;
  adres: Adres;
}
