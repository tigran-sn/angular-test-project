import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LazyLoadErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404 && this.isLazyLoadError(error)) {
          console.error('Lazy load error detected. Reloading the page.');
          window.location.reload();
        }
        return throwError(() => error);
      })
    );
  }

  private isLazyLoadError(error: HttpErrorResponse): boolean {
    // Check if the error is related to lazy loading
    // This is a simple check and might need to be adjusted based on your specific error response
    return error.url?.includes('chunk') || error.error?.message?.includes('lazy load');
  }
}
