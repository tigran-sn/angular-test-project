import {Injectable, ErrorHandler} from "@angular/core";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  handleError(error: Error | HttpErrorResponse): void {
    const chunkFailedMessage = /Failed to fetch dynamically imported module:/;
    if (chunkFailedMessage.test(error.message)) {
      window.location.reload();
    }
    // console.error('Error from global error handler', error);
  }
}
