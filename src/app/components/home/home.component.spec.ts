import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { FeatureFlagService } from '@app/services/feature-flag.service';
import { FeatureFlagDirective } from '@app/directives/feature-flag.directive';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

class MockFeatureFlagService {
  private features: Record<string, boolean> = {};

  setFeature(key: string, value: boolean) {
    this.features[key] = value;
  }

  getFeature(key: string): boolean {
    return this.features[key];
  }
}

@Component({
  selector: 'app-banner',
  template: '<div data-testid="banner">Mock Banner</div>',
  standalone: true,
})
class MockBannerComponent {}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;
  let featureFlagService: MockFeatureFlagService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: FeatureFlagService, useClass: MockFeatureFlagService },
      ],
    })
      .overrideComponent(HomeComponent, {
        set: {
          imports: [MockBannerComponent, FeatureFlagDirective],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    featureFlagService = TestBed.inject(
      FeatureFlagService
    ) as unknown as MockFeatureFlagService;
  });

  it('should render the banner when the feature flag is enabled', () => {
    featureFlagService.setFeature('bannerEnabled', true);
    fixture.detectChanges();

    const banner = fixture.debugElement.query(By.css('[data-testid="banner"]'));
    const fallback = fixture.debugElement.query(By.css('.mail-message'));

    expect(banner).toBeTruthy();
    expect(fallback).toBeNull();
  });

  it('should render the fallback message when the feature flag is disabled', () => {
    featureFlagService.setFeature('bannerEnabled', false);
    fixture.detectChanges();

    const banner = fixture.debugElement.query(By.css('[data-testid="banner"]'));
    const fallback = fixture.debugElement.query(By.css('.mail-message'));

    expect(banner).toBeNull();
    expect(fallback).toBeTruthy();
    expect(fallback.nativeElement.textContent).toContain(
      'Mail us one for your login'
    );
  });
});
