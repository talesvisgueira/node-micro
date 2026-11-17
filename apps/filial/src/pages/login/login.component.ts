import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@/src/services/LoginService';
import { LocalStorageService } from '@/src/services/LocalStorageService';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [LoginService]
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly loginService = inject(LoginService);
  private readonly localStorageService = inject(LocalStorageService);

  readonly isLoginValid = signal(true);
  readonly isLoading = signal(false);

  readonly loginForm = new FormGroup({
    username: new FormControl('tales@gmail.com', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('taver5cea8', [Validators.required, Validators.minLength(8)])
  });

  onCancel(): void {
    this.localStorageService.limparLocalStorage();
    this.router.navigateByUrl('access');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    const username = this.loginForm.controls['username'].value ?? '';
    const password = this.loginForm.controls['password'].value ?? '';
    const request = { username, password };
    this.localStorageService.limparLocalStorage();

    this.loginService.login(request).subscribe({
      next: (result) => {
        this.isLoginValid.set(true);
        this.isLoading.set(false);
        this.localStorageService.gravarLocalStorage(result.name || username || 'Operador', result.token);
        this.router.navigateByUrl('home');
      },
      error: () => {
        this.isLoginValid.set(false);
        this.isLoading.set(false);
      }
    });
  }
}
