import { Huisarts } from './huisarts';

export interface Team {
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
