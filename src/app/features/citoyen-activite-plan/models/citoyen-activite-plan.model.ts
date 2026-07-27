import { Planning } from "./planning.model";

export interface CitoyenActivitePlan {

  idCitoyenActivitePlan?: number;

  nomCitoyen: string;

  idActivite: number;

  nomActivite: string;

  plannings: Planning[];

}