import { Component, EventEmitter, input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms-rappel',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-rappel.html',
  styleUrl: './forms-rappel.css',
})
export class FormsRappel {
  formRappel = new FormGroup({
    nom_medicament: new FormControl(''),
    frequence: new FormControl('FIXE'),
    intervalle: new FormControl<number | null>(null),
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
    dateRappel: new FormControl(''),
  });
  @Output() onCloseForm = new EventEmitter<boolean>();
  @Output() onSubmitForm = new EventEmitter<FormGroup>();

  onSubmit() {
    this.onSubmitForm.emit(this.formRappel);
  }

  onCloseCreateRappel() {
    this.onCloseForm.emit(false);
  }
}
