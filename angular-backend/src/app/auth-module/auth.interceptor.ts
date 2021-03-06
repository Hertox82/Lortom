import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authServ: AuthService) {}

    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // do stuff with response if you want
              }
            }, (err: any) => {
              if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                  // redirect to the login route
                  // or show a modal
                  this.router.navigate(['/backend/login']);
                } else if (err.status === 403) {
                  this.authServ.createUser();
                  this.router.navigate(['/backend/dashboard']);
                } else if (err.status === 404) {
                  this.router.navigate(['/backend/not-found']);
                } else if (err.status === 200 ) {
                  this.router.navigate(['/backend/login']);
                }
              }
        }));
    }
}
