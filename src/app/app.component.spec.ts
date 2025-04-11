import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestClass } from './interceptors/http-error.interceptor';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { NavigationComponent } from '@app/components/navigation/navigation.component';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

class MockTestClass {
  getData() {
    return of('mocked response');
  }
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let testClass: MockTestClass;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: TestClass, useClass: MockTestClass },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    testClass = TestBed.inject(TestClass) as unknown as MockTestClass;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData from TestClass on init', () => {
    const spy = spyOn(testClass, 'getData').and.callThrough();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  describe('AppComponent Template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should show dev mode banner if isDevMode is true', () => {
      const banner = fixture.debugElement.query(By.css('.dev-mode-banner'));
      expect(banner).toBeTruthy();
      expect(banner.nativeElement.textContent).toContain('Dev Mode');
    });

    it('should contain the NavigationComponent', () => {
      const nav = fixture.debugElement.query(By.directive(NavigationComponent));
      expect(nav).toBeTruthy();
    });

    it('should contain the router outlet', () => {
      const outlet = fixture.debugElement.query(By.directive(RouterOutlet));
      expect(outlet).toBeTruthy();
    });
  });
});
