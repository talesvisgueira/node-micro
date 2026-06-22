import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class LocalStorageService {
    limparLocalStorage() {
        localStorage.setItem('OpenSwesUserName', '') ;
        localStorage.setItem('OpenSwesTokenJWT', '') ;
    }

    gravarLocalStorage(userName: string, tokenJWT: string) {
        localStorage.setItem('OpenSwesUserName', userName) ;
        localStorage.setItem('OpenSwesTokenJWT', tokenJWT) ;
    }

    obterUserName(): string {
        return localStorage.getItem('OpenSwesUserName') || '';
    }

    obterTokenJWT(): string {
        return localStorage.getItem('OpenSwesTokenJWT') || '';
    }
}