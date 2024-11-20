import {APP_INITIALIZER, ApplicationConfig, DEFAULT_CURRENCY_CODE, ErrorHandler, inject} from '@angular/core';
import {provideRouter, withViewTransitions} from '@angular/router';

import { routes } from './app.routes';
import {GlobalErrorHandler} from "./interceptors/global-error-handler.service";
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi
} from "@angular/common/http";
import {HttpErrorInterceptor} from "./interceptors/http-error.interceptor";
import {Observable} from "rxjs";
import {FeatureFlagService, GreetingService} from "./services";
import {ReactiveFormsModule} from "@angular/forms";
import {FeatureFlagResponse} from "@app/types";

function initializeFeatureFlag(): () => Observable<FeatureFlagResponse> {
  const featureFlagService = inject(FeatureFlagService);
  return () => featureFlagService.getFeatureFlags();
}

export const provideFeatureFlag = () => ({
  provide: APP_INITIALIZER,
  useFactory: initializeFeatureFlag,
  deps: [],
  multi: true,
})

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi(),
      // withInterceptors([HttpErrorInterceptor]),
    ),
    provideFeatureFlag(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LazyLoadErrorInterceptor,
    //   multi: true
    // },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    {provide: DEFAULT_CURRENCY_CODE, useValue: 'GBP'},
    ReactiveFormsModule,
    GreetingService
  ]
};
