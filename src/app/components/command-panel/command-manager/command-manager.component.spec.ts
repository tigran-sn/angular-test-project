import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandManager } from './command-manager.component';

xdescribe('CommandManager', () => {
  let component: CommandManager;
  let fixture: ComponentFixture<CommandManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandManager],
    }).compileComponents();

    fixture = TestBed.createComponent(CommandManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
