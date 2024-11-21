import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of, tap} from "rxjs";
import {FeatureFlagKeys, FeatureFlagResponse} from "@app/types";
import {FEATURE_FLAGS_MOCK} from "@app/mocks";

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  http = inject(HttpClient);
  // features: Record<keyof FeatureFlagResponse, boolean> = {} as Record<keyof FeatureFlagResponse, boolean>;
  features!: Record<string, boolean>;

  getFeatureFlags(): Observable<FeatureFlagResponse> {
    // In case of API giving flags
    // Currently we are using simple Node.js app with Express, which is returning hard-coded value
    // return this.http.get<FeatureFlagResponse>('http://localhost:3000/feature-flags')
    //   .pipe(
    //     tap((features) => this.features = features)
    //   );

    // Just mocking the return value
    return of(FEATURE_FLAGS_MOCK)
      .pipe(
        tap(features => this.features = features)
      )
  }

  // getFeatureFlags(): Observable<any> {
  //   return this.http.get<any>('https://run.mocky.io/v3/828b6fe4-a783-4d87-8177-3ba37ddb3759')
  //     .pipe(
  //       catchError(err => {
  //         debugger;
  //         return throwError(err);
  //       }),
  //       tap((features) => this.features = features),
  //     );
  // }

  getFeature(feature: FeatureFlagKeys): boolean {
    return this.features[feature] ?? false;
  }
}
