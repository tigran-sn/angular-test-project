import { ComponentFixture, TestBed } from '@angular/core/testing';

import { particlesComponent } from './particles.component';

describe('particlesComponent', () => {
  let component: particlesComponent;
  let fixture: ComponentFixture<particlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [particlesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(particlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
