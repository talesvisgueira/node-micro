import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  readonly username = signal('');
  readonly isLoginValid = signal(false);
  readonly isMobileMenuOpen = signal(false);

  readonly isHomeRoute = computed(() => {
    return this.router.url.startsWith('/home');
  });

  ngOnInit(): void {
    this.definirUsuario();
  }

  definirUsuario(): void {
    const storedUsername = this.localStorageService.obterUserName();
    if (storedUsername && storedUsername.trim().length > 0) {
      this.isLoginValid.set(true);
      this.username.set(storedUsername);
    } else {
      this.isLoginValid.set(false);
      this.username.set('');
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  onLogin(): void {
    this.closeMobileMenu();
    this.router.navigateByUrl('login');
  }

  onExit(): void {
    this.closeMobileMenu();
    this.localStorageService.limparLocalStorage();
    this.isLoginValid.set(false);
    this.username.set('');
    this.router.navigateByUrl('access');
  }
}
