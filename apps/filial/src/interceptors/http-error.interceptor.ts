import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';
import { Router } from '@angular/router';


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router,
    private modalService: NgbModal,
    private modalConfig: NgbModalConfig
  ) {
    this.modalConfig.backdrop = 'static';
    this.modalConfig.centered = true;
    this.modalConfig.keyboard = false;
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        let mensagem = '';
        localStorage.setItem('OpenSwesUserName', '') ;
        localStorage.setItem('OpenSwesTokenJWT', '') ;
        if (err.status === HttpStatusCode.Forbidden) {
          mensagem = 'Usuário não logado ou seção expirou.';
          this.router.navigateByUrl('access');
        } else if (err.status === HttpStatusCode.Unauthorized) {
          mensagem = 'Usuário sem permissão para acessar o recurso.';
          this.router.navigateByUrl('login');
          return throwError(() => new Error(mensagem));
        } else {
          mensagem = err.error?.mensagem || err.message;
        }
        const modalRef = this.modalService.open(ErrorDialogComponent);
		    modalRef.componentInstance.mensagem = mensagem;
        return throwError(() => new Error(mensagem));
        // return
      })
    );
  }
}
