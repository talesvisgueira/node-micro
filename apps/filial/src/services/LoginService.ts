import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';
import { UserLoginRequest } from '@myorg/core/dist/interfaces/userLoginRequest'
import { Encriptor } from '@myorg/core/dist/encrypts/Encriptor';

import { EncriptorModule } from '@myorg/core/dist/encrypts/encript.model';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly http: HttpClient = inject(HttpClient);

  login(user: UserLoginRequest): Observable<UserCredencial> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    var encriptor:Encriptor = new Encriptor;
    const cipherText = encriptor.encrypt(user.password.toString());
    user.password = cipherText.toString();
    return this.http.post<UserCredencial>(`${environment.apiUrl}/login`, user, httpOptions);
  }

}
