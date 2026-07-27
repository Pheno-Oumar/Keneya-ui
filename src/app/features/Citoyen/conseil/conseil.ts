import { Component } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatCardFooter } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-conseil',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatIcon, MatCardFooter],
  templateUrl: './conseil.html',
  styleUrl: './conseil.css',
})
export class Conseil {}
