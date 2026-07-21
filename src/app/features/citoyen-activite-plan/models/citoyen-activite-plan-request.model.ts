import { Planning } from "./planning.model";

export interface CitoyenActivitePlanRequest {

    idCitoyen: number;

    idActivite : number;

    plannings: Planning[]; 
}