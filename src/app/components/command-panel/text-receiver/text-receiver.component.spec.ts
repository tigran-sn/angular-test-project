import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextReceiver } from './text-receiver.component';

describe('TextReceiver', () => {
  let component: TextReceiver;
  let fixture: ComponentFixture<TextReceiver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextReceiver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextReceiver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
