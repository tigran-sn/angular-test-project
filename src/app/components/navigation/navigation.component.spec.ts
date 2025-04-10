import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  const mockMenuItems = [
    { path: '/mock-home', label: 'Mock Home' },
    { path: '/mock-panel', label: 'Mock Panel' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    component.menuItems = mockMenuItems;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all mocked menu items with correct labels and links', () => {
    const anchorElements = fixture.debugElement.queryAll(
      By.css('.nav-links a')
    );

    expect(anchorElements.length).toBe(mockMenuItems.length);

    anchorElements.forEach((anchor, index) => {
      const item = mockMenuItems[index];
      expect(anchor.nativeElement.textContent.trim()).toBe(item.label);
      expect(anchor.attributes['ng-reflect-router-link']).toBe(item.path);
    });
  });
});
