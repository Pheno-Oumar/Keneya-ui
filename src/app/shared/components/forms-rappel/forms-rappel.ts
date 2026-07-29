import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms-rappel',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms-rappel.html',
  styleUrls: ['./forms-rappel.css'],
})
export class FormsRappel {
  formRappel = new FormGroup({
    nom_medicament: new FormControl(''),
    frequence: new FormControl('FIXE'),
    intervalle: new FormControl(),
    dateDebut: new FormControl(''),
    dateFin: new FormControl(''),
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

