import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {FeatureFlagKeys, FeatureFlagResponse} from "@app/types";

@Injectable({ providedIn: 'root' })
export class FeatureFlagService {
  http = inject(HttpClient);
  // features: Record<keyof FeatureFlagResponse, boolean> = {} as Record<keyof FeatureFlagResponse, boolean>;
  features!: Record<string, boolean>;

  getFeatureFlags(): Observable<FeatureFlagResponse> {
    // In case of API giving flags
    // Currently we are using simple Node.js app with Express, which is returning hard-coded value
    return this.http.get<FeatureFlagResponse>('http://localhost:3000/feature-flags')
      .pipe(
        tap((features) => this.features = features)
      );

    // Just mock
    // return of({
    //   bannerEnabled: true,
    // })
    //   .pipe(
    //     tap((features) => {
    //       this.features = features
    //     })
    //   )
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
