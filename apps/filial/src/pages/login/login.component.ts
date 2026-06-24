import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@/src/services/LoginService';

import { Encriptor } from '@myorg/core/src/encrypts/Encriptor';

import { LocalStorageService } from '@/src/services/LocalStorageService';
import * as CryptoJS from 'crypto-js';
import { EncriptorModule } from '@myorg/core/dist/encrypts/encript.model';


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
      username: new  FormControl("tales",[Validators.required,Validators.minLength(5)]),
      password: new FormControl("taver5cea8!",[Validators.required,Validators.minLength(8)])
    })

    onCancel() {
      this.localStorageService.limparLocalStorage();
      this.router.navigateByUrl('access');
    }



    onSubmit() {

      const request = this.loginForm.value;
      var encriptor:Encriptor = new Encriptor;
      const cipherText = encriptor.encrypt(request.password.toString());
      console.log('Senha: ', request.password  );
      console.log('Criptografada: ', cipherText.toString()  );
      console.log('Descriptografado: ',  encriptor.decrypt(cipherText.toString()).toString(CryptoJS.enc.Utf8)  );

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
