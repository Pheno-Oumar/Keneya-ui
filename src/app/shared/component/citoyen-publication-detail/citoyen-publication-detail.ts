import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatIcon } from "@angular/material/icon";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-citoyen-publication-detail',
  imports: [MatDialogContent, MatIcon, MatDivider],
  templateUrl: './citoyen-publication-detail.html',
  styleUrl: './citoyen-publication-detail.css',
})
export class CitoyenPublicationDetail {
  data = inject(MAT_DIALOG_DATA);
}
