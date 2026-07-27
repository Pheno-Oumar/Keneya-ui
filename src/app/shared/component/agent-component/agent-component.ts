import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AgentFormDialog } from '../dialogs/agent-form-dialog/agent-form-dialog';

@Component({
  selector: 'app-agent-component',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './agent-component.html',
  styleUrl: './agent-component.css',
})
export class AgentComponent {
  private dialog = inject(MatDialog);

  ajouter() {
    this.dialog.open(AgentFormDialog, {
      width: '600px',
      maxHeight: '100%',
    });
  }
}
