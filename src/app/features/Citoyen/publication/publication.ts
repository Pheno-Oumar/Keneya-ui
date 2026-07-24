import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'app-publication',
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  templateUrl: './publication.html',
  styleUrl: './publication.css',
})
export class Publication {
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;
}
