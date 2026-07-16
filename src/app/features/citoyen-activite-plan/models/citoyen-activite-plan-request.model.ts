import { Planning } from "./planning.model";

export interface CitoyenActivitePlanRequest {

    idCitoyen: number;

    idActivité : number;

    plannning: Planning[]; 
}