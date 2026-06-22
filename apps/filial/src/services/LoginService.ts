import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { environment } from '../environments/environment.development';



@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private readonly http: HttpClient = inject(HttpClient);

  login(user: UserLogin): Observable<UserCredencial> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<UserCredencial>(`${environment.apiUrl}/login`, user, httpOptions);
  }

}