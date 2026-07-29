import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-dahbord-admin-component',
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatListModule],
  templateUrl: './dahbord-admin-component.html',
  styleUrls: ['./dahbord-admin-component.css'],
})
export class DahbordAdminComponent {}



