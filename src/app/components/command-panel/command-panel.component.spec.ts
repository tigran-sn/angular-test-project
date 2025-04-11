import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CommandPanelComponent } from './command-panel.component';

class MockTextReceiver {
  private text = '';
  setText(val: string) {
    this.text = val;
  }
  getText(): string {
    return this.text;
  }
}

class MockCommand {
  constructor(private receiver: any, private text: string) {}
  execute() {
    this.receiver.setText(this.text);
  }
  undo() {}
}

class MockCommandManager {
  executeCommand(command: any) {
    command.execute();
  }
  undo() {}
  redo() {}
}

// --- Tests ---
describe('CommandPanelComponent', () => {
  let component: CommandPanelComponent;
  let fixture: ComponentFixture<CommandPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandPanelComponent, FormsModule],
    })
      .overrideComponent(CommandPanelComponent, {
        set: {
          providers: [],
          // Inject mock implementations into the component manually
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CommandPanelComponent);
    component = fixture.componentInstance;

    (component as any).receiver = new MockTextReceiver();
    (component as any).commandManager = new MockCommandManager();
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update text from textarea', () => {
    const textarea: HTMLTextAreaElement = fixture.nativeElement.querySelector(
      '[data-testid="text-input"]'
    );
    textarea.value = 'Test input';
    textarea.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.currentText).toBe('Test input');
  });

  it('should display character count', () => {
    component.currentText = 'Hello!';
    fixture.detectChanges();

    const charCountEl = fixture.nativeElement.querySelector(
      '[data-testid="char-count"]'
    );
    expect(charCountEl.textContent).toContain('6 characters');
  });

  it('should apply changes on Apply button click', () => {
    const spyExecute = spyOn(
      MockCommandManager.prototype,
      'executeCommand'
    ).and.callThrough();
    const spySet = spyOn(
      MockTextReceiver.prototype,
      'setText'
    ).and.callThrough();

    component.currentText = 'Updated!';
    fixture.detectChanges();

    const applyBtn = fixture.nativeElement.querySelector(
      '[data-testid="apply-btn"]'
    );
    applyBtn.click();

    expect(spyExecute).toHaveBeenCalled();
    expect(spySet).toHaveBeenCalledWith('Updated!');
  });

  it('should call undo and update text', () => {
    const receiver = new MockTextReceiver();
    receiver.setText('Before Undo');
    (component as any).receiver = receiver;
    (component as any).commandManager = {
      undo: () => {},
    };
    spyOn(receiver, 'getText').and.returnValue('After Undo');

    component.undo();
    expect(component.currentText).toBe('After Undo');
  });

  it('should call redo and update text', () => {
    const receiver = new MockTextReceiver();
    receiver.setText('Before Redo');
    (component as any).receiver = receiver;
    (component as any).commandManager = {
      redo: () => {},
    };
    spyOn(receiver, 'getText').and.returnValue('After Redo');

    component.redo();
    expect(component.currentText).toBe('After Redo');
  });
});
