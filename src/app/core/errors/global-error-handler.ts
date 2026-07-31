import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {

    console.error(
      "🔥 ERREUR ANGULAR COMPLETE :",
      error
    );

    alert(
      "Une erreur est survenue. Regardez la console."
    );

  }

}
