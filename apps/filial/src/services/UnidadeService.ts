import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment.development';


@Injectable({
    providedIn: 'root'
})

export class UnidadeService {

    private readonly http: HttpClient = inject(HttpClient);

    buscarHttpHeader() {
        const tokenJWT  = localStorage.getItem('OpenSwesTokenJWT' ) ;
        const httpOptions = {
            headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'accept': '*/*',
            'Access-Control-Allow-Headers':'',
            'Authorization': 'Bearer ' + tokenJWT!,
        })
        };
        return httpOptions
    }


    listarUnidades(): Observable<any> {
        return this.http.get<Unidade[]>(`${environment.apiUrl}}/unidades`, this.buscarHttpHeader());
    }

}
