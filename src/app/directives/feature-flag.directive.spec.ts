import { Component, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureFlagDirective } from './feature-flag.directive';
import { FeatureFlagService } from '@app/services/feature-flag.service';
import { By } from '@angular/platform-browser';

class MockFeatureFlagService {
  private features: Record<string, boolean> = {};

  getFeature(key: string) {
    return this.features[key];
  }

  setFeature(key: string, value: boolean) {
    this.features[key] = value;
  }
}

@Component({
  template: `
    <ng-container *featureFlag="'bannerEnabled'; else notEnabled">
      <div data-testid="banner">Banner Content</div>
    </ng-container>

    <ng-template #notEnabled>
      <div data-testid="fallback">Fallback Content</div>
    </ng-template>
  `,
  standalone: true,
  imports: [FeatureFlagDirective],
})
class TestHostComponent {}

describe('FeatureFlagDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let featureFlagService: MockFeatureFlagService;
  let banner: any;
  let fallback: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    featureFlagService = TestBed.inject(
      FeatureFlagService
    ) as unknown as MockFeatureFlagService;
  });

  it('should display banner when feature flag is enabled', () => {
    featureFlagService.setFeature('bannerEnabled', true);
    fixture.detectChanges();

    banner = fixture.debugElement.query(By.css('[data-testid="banner"]'));
    fallback = fixture.debugElement.query(By.css('[data-testid="fallback"]'));

    expect(banner).toBeTruthy();
    expect(fallback).toBeNull();
  });

  it('should display fallback when feature flag is disabled', () => {
    featureFlagService.setFeature('bannerEnabled', false);
    fixture.detectChanges();

    banner = fixture.debugElement.query(By.css('[data-testid="banner"]'));
    fallback = fixture.debugElement.query(By.css('[data-testid="fallback"]'));

    expect(banner).toBeNull();
    expect(fallback).toBeTruthy();
  });
});
