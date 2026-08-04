import { RappelResponse } from './rappel';

export interface NotificationResponse<T> {
  id: number;
  rappel: T;
  dateDeclenchement: Date;
  lue: boolean;
}
