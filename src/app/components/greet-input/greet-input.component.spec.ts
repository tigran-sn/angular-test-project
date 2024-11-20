import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreetInputComponent } from './greet-input.component';

describe('GreetInputComponent', () => {
  let component: GreetInputComponent;
  let fixture: ComponentFixture<GreetInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreetInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GreetInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
