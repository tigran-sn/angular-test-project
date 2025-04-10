import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerComponent } from './banner.component';
import { By } from '@angular/platform-browser';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the banner title and description', () => {
    const titleEl = fixture.debugElement.query(
      By.css('.banner-content h1')
    ).nativeElement;
    const descriptionEl = fixture.debugElement.query(
      By.css('.banner-content p')
    ).nativeElement;

    expect(titleEl.textContent).toContain('Welcome to Our Site');
    expect(descriptionEl.textContent).toContain(
      'Discover amazing features and offers!'
    );
  });

  it('should render the "Learn More" button', () => {
    const buttonEl = fixture.debugElement.query(
      By.css('.cta-button')
    ).nativeElement;
    expect(buttonEl.textContent).toContain('Learn More');
  });
});
