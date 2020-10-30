import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthService, private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    request = request.clone({
      url:  request.url
    });

    let token: string = localStorage.getItem("token_gim");
    if (token) {
      request = request.clone({
        headers: request.headers.set("authorization",  token)
       
      });
    }

    if (!request.headers.has("Content-Type") ||!request.headers.has('x-application-id') ) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json")
      });
     
    }
      return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {

        if (error.status == 403 || error.status == 401) {
          this.router.navigate(["login"]);
        }
        return throwError(error);
      })
    );
  }
}