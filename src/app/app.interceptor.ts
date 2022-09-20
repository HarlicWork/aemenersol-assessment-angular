import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  token: string | null;
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.token = localStorage.getItem('authToken');

    debugger;
    if (this.token) {
      const modifiedReqHeader = req.clone({
        headers: new HttpHeaders().set(
          'Authorization',
          'Bearer ' + JSON.parse(this.token)
        ),
      });
      return next.handle(modifiedReqHeader);
    }

    return next.handle(req);
  }
}
