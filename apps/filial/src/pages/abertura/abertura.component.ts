import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarAberturaComponent } from '../../components/sidebar-abertura/sidebar-abertura.component';

@Component({
  selector: 'app-abertura',
  imports: [
    RouterModule,
    RouterLink,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    SidebarAberturaComponent
  ],
  templateUrl: './abertura.component.html',
  styleUrl: './abertura.component.scss'
})
export class AberturaComponent {
  private readonly router = inject(Router);

  readonly isChildRouteActive = computed(() => {
    const url = this.router.url;
    return url !== '/access' && url !== '/access/';
  });

  readonly activeFaqIndex = signal<number | null>(0);

  toggleFaq(index: number): void {
    this.activeFaqIndex.update((current) => (current === index ? null : index));
  }

  navigateToLogin(): void {
    this.router.navigateByUrl('login');
  }
}
