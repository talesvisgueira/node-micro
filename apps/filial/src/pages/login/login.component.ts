import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@/src/services/LoginService';
import { LocalStorageService } from '@/src/services/LocalStorageService';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [Router,LoginService]
})

export class LoginComponent {


    isLoginValid: boolean = true;
    loginService: LoginService = inject(LoginService);
    localStorageService: LocalStorageService = inject(LocalStorageService);

    constructor(private router:Router) {}

    loginForm: FormGroup = new FormGroup({
      username: new  FormControl("tales@gmail.com",[Validators.required,Validators.minLength(5)]),
      password: new FormControl("taver5cea8",[Validators.required,Validators.minLength(8)])
    })

    onCancel() {
      this.localStorageService.limparLocalStorage();
      this.router.navigateByUrl('access');
    }



    onSubmit() {

      const request = this.loginForm.value;
      this.localStorageService.limparLocalStorage();
      this.loginService.login(request).subscribe( result => {
          this.isLoginValid = true;
          this.localStorageService.gravarLocalStorage(result.name,result.token);
          // console.log('Token return: ', result.token);
          this.router.navigateByUrl('home');
      });
      this.isLoginValid = false;
  }

}
