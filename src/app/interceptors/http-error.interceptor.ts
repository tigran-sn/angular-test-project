import {
    HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
// import {NavigationExtras} from "@angular/router";

@Injectable({
  providedIn: 'root',
})
export class TestClass {
  private http = inject(HttpClient);

  getData(): Observable<any> {
    return this.http.get('https://swapiz.dev/api/people/1').pipe(catchError(err => {
      console.log('Error from catchError');
      return throwError(() => err);
    }));
  }
}

// export const HttpErrorInterceptor: HttpInterceptorFn = (req, next) => {
//   const test = inject(TestClass)
//   test.getData().pipe(
//     catchError(err => {
//       return err
//     })
//   )
//   return next(req)
// }

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: any) => {
          if (error instanceof HttpErrorResponse) {
              if (error.status === 404 && this.isLazyLoadError(error)) {
                console.error('Lazy load error detected. Reloading the page.');
                window.location.reload();
              }
              if (error.error instanceof ErrorEvent) {
                  console.error("Error Event");
              } else {
                  console.log(`error status : ${error.status} ${error.statusText}`);
                  switch (error.status) {
                      case 401:      //login
                          console.error("Unauthorized");
                          // this.router.navigateByUrl("/login");
                          break;
                      case 403:     //forbidden
                          console.error("Forbidden");
                          // this.router.navigateByUrl("/unauthorized");
                          break;
                      // case (404):
                      //   console.error("Not Found");
                      //   window.location.reload();
                      //   break;
                      case 500:
                          // const navigationExtras: NavigationExtras = { state: { error: error.error } };
                          // this.router.navigateByUrl("/server-error", navigationExtras);
                          break;
                  }
              }
          } else {
              console.error("some thing else happened");
          }
          return throwError(() => error)
      })
    );
  }

  private isLazyLoadError(error: HttpErrorResponse): boolean {
    // Check if the error is related to lazy loading
    // This is a simple check and might need to be adjusted based on your specific error response
    return error.url?.includes('chunk') || error.error?.message?.includes('lazy load');
  }
}
