import {FeatureFlagResponse} from "./feature-flag-response.type";

export type _FeatureFlagKeys = keyof FeatureFlagResponse;

export type FeatureFlagKeys = {
  [K in _FeatureFlagKeys]: K;
}[_FeatureFlagKeys];
