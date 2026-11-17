import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorageService';

interface AuditBatch {
  id: string;
  omNome: string;
  competencia: string;
  registros: number;
  status: 'homologado' | 'em_analise' | 'pendente' | 'fila';
  statusLabel: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, DecimalPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  readonly isSidebarCollapsed = signal(false);
  readonly username = signal(this.localStorageService.obterUserName() || 'Operador');

  readonly isRootHome = computed(() => {
    const url = this.router.url;
    return url === '/home' || url === '/home/';
  });

  readonly currentDate = signal(
    new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date())
  );

  readonly recentBatches = signal<AuditBatch[]>([
    {
      id: 'LOT-2026-1101',
      omNome: '1ª Região Militar (Rio de Janeiro)',
      competencia: '11/2026',
      registros: 24120,
      status: 'homologado',
      statusLabel: 'Homologado'
    },
    {
      id: 'LOT-2026-1102',
      omNome: 'Comando Militar do Sul (Porto Alegre)',
      competencia: '11/2026',
      registros: 31450,
      status: 'homologado',
      statusLabel: 'Homologado'
    },
    {
      id: 'LOT-2026-1103',
      omNome: 'Comando Militar do Planalto (Brasília)',
      competencia: '11/2026',
      registros: 18900,
      status: 'em_analise',
      statusLabel: 'Em Análise'
    },
    {
      id: 'LOT-2026-1104',
      omNome: '7ª Região Militar (Recife)',
      competencia: '11/2026',
      registros: 15300,
      status: 'fila',
      statusLabel: 'Na Fila'
    }
  ]);

  toggleSidebar(): void {
    this.isSidebarCollapsed.update((collapsed) => !collapsed);
  }

  onExit(): void {
    this.localStorageService.limparLocalStorage();
    this.router.navigateByUrl('access');
  }
}
