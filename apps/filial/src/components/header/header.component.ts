import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/LocalStorageService';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly localStorageService = inject(LocalStorageService);

  readonly isLoginValid = signal(false);
  readonly username = signal('');

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
      if (this.router.url.startsWith('/home')) {
        this.router.navigateByUrl('access');
      }
    }
  }
}
