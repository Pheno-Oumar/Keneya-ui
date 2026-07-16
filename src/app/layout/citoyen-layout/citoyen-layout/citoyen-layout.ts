import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CitoyenSidenav } from '../../sidenav/citoyen-sidenav/citoyen-sidenav';
import { HeaderCitoyen } from '../../header/header-citoyen/header-citoyen';

@Component({
  selector: 'app-citoyen-layout',
  imports: [RouterOutlet,CitoyenSidenav,HeaderCitoyen],
  templateUrl: './citoyen-layout.html',
  styleUrl: './citoyen-layout.css',
})
export class CitoyenLayout {}
