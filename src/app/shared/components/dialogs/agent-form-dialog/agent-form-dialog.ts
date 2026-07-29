import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { AgentService } from '../../../../core/services/agent/agent-service';
import { AgentRequestInterface } from '../../../models/agent';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-agent-form-dialog',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatDialogModule],
  templateUrl: './agent-form-dialog.html',
  styleUrls: ['./agent-form-dialog.css'],
})
export class AgentFormDialog {
  private dilogRef = inject(MatDialogRef<AgentFormDialog>);
  private agentService = inject(AgentService);
  data = inject(MAT_DIALOG_DATA);
  private response: object | undefined;
  private router = inject(Router);
  form = new FormGroup({
    nom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    prenom: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    telephone: new FormControl('', [Validators.minLength(8)]),
    specialite: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  ngOnInit() {
    if (this.data?.mode === 'edit') {
      this.form.patchValue(this.data.agent);
    }
  }
  onSubmit(): void {

    if (this.form.invalid) {
      return;
    }

    const agent = this.form.getRawValue() as AgentRequestInterface;

    if (this.data?.mode === 'edit') {

      this.agentService
        .modifier(this.data.agent.id, agent)
        .subscribe({
          next: () => this.dilogRef.close(true),
          error: err => console.log(err)
        });

    } else {

      this.agentService
        .ajouterAgent(agent)
        .subscribe({
          next: () => this.dilogRef.close(true),
          error: err => console.log(err)
        });

    }

  }

  close() {
    this.dilogRef.close(false);
  }
}



