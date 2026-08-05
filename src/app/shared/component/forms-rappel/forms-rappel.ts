import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms-rappel',
  imports: [ReactiveFormsModule],
  templateUrl: './forms-rappel.html',
  styleUrl: './forms-rappel.css',
})
export class FormsRappel implements OnInit {
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
  minDateDebut!: string;

  ngOnInit(): void {
    this.minDateDebut = this.calculerMaintenant();
  }

  private calculerMaintenant(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // "yyyy-MM-ddTHH:mm"
  }

  onSubmit() {
    this.onSubmitForm.emit(this.formRappel);
  }

  onCloseCreateRappel() {
    this.onCloseForm.emit(false);
  }
}
