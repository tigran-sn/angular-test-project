import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTextCommand } from './change-text-command.component';

xdescribe('ChangeTextCommand', () => {
  let component: ChangeTextCommand;
  let fixture: ComponentFixture<ChangeTextCommand>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeTextCommand],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeTextCommand);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
