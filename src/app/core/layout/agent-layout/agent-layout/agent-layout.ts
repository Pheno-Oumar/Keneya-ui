import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AgentSidenav } from '../../sidenav/agent-sidenav/agent-sidenav';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-agent-layout',
  imports: [RouterOutlet,AgentSidenav],
  templateUrl: './agent-layout.html',
  styleUrls: ['./agent-layout.css'],
})
export class AgentLayout {}



