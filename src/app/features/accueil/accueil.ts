import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-accueil',
  imports: [CommonModule,RouterModule,MatButtonModule,MatIconModule,MatCardModule],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css',
})
export class Accueil { }
