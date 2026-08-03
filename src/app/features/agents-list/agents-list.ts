import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AgentService } from '../../core/services/agent/agent-service';
import { AgentResponseInterface } from '../../shared/models/agent';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-agents-list',
  standalone: true,
  templateUrl: './agents-list.html',
  styleUrls: ['./agents-list.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
  ],
})
export class AgentsListComponent implements OnInit {
  private service = inject(AgentService);
  private notification = inject(NotificationService);

  agents = signal<AgentResponseInterface[]>([]);
  loading = signal<boolean>(false);
  searchTerm = signal<string>('');
  selectedSpecialite = signal<string>('');

  // Liste unique des spécialités présentes, calculée à partir des agents chargés
  specialites = computed(() => {
    const set = new Set(
      this.agents()
        .map(a => a.specialite)
        .filter((s): s is string => !!s)
    );
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  });

  filteredAgents = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const specialite = this.selectedSpecialite();

    return this.agents().filter(agent => {
      const matchesSpecialite = !specialite || agent.specialite === specialite;

      const matchesTerm =
        !term ||
        `${agent.nom} ${agent.prenom}`.toLowerCase().includes(term) ||
        (agent.specialite ?? '').toLowerCase().includes(term) ||
        (agent.email ?? '').toLowerCase().includes(term);

      return matchesSpecialite && matchesTerm;
    });
  });

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.loading.set(true);
    this.service.getAll().subscribe({
      next: (response) => {
        this.agents.set(response.data ?? []);
        this.loading.set(false);
      },
      error: () => {
        this.notification.error("Impossible de charger la liste des agents");
        this.loading.set(false);
      },
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  onSpecialiteChange(value: string): void {
    this.selectedSpecialite.set(value);
  }

  initiales(agent: AgentResponseInterface): string {
    const n = agent.nom?.charAt(0) ?? '';
    const p = agent.prenom?.charAt(0) ?? '';
    return `${n}${p}`.toUpperCase();
  }
}
