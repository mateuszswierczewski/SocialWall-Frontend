import { AuthService } from './../services/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.url.includes('signUp') && !req.url.includes('signIn')) {
      req = req.clone({
        setHeaders: {
          Authorization: AuthService.authorizationToken
        }
      });
    }
    return next.handle(req);
  }

}
