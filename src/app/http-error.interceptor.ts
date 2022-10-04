import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";


// other
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(

    private logger: NGXLogger,  // trace, debug, info, log, warn, error, fatal
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          // get error message
          let errorMessage = "";
          if (error.error instanceof ErrorEvent) {  // client-side error
            errorMessage = "Error: " + error.error.message;
          } else {  // server-side error
            errorMessage = "Error Code: " + error.status.toString() + "; Message: " + error.message;
          }

          // log error
          this.logger.error("HTTP error >> " + errorMessage);

          // show popup
          alert(errorMessage);
       

          // return
          return throwError(errorMessage);
        })
      )
  }
}
