import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignalsComponent } from './signals.component';
import { By } from '@angular/platform-browser';

describe('SignalsComponent', () => {
  let component: SignalsComponent;
  let fixture: ComponentFixture<SignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function getTestEl(testId: string) {
    return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  }

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial count and double', () => {
    const countEl = getTestEl('count-display').nativeElement;
    const doubleEl = getTestEl('double-display').nativeElement;

    expect(countEl.textContent).toContain('Count: 0');
    expect(doubleEl.textContent).toContain('Double: 0');
  });

  it('should increment count and update double on button click', () => {
    getTestEl('increment-btn').nativeElement.click();
    fixture.detectChanges();

    const countEl = getTestEl('count-display').nativeElement;
    const doubleEl = getTestEl('double-display').nativeElement;

    expect(countEl.textContent).toContain('Count: 1');
    expect(doubleEl.textContent).toContain('Double: 2');
  });

  it('should decrement count and update double on button click', () => {
    component.count.set(2);
    fixture.detectChanges();

    getTestEl('decrement-btn').nativeElement.click();
    fixture.detectChanges();

    const countEl = getTestEl('count-display').nativeElement;
    const doubleEl = getTestEl('double-display').nativeElement;

    expect(countEl.textContent).toContain('Count: 1');
    expect(doubleEl.textContent).toContain('Double: 2');
  });

  it('should reset count to 0 on button click', () => {
    component.count.set(5);
    fixture.detectChanges();

    getTestEl('reset-btn').nativeElement.click();
    fixture.detectChanges();

    const countEl = getTestEl('count-display').nativeElement;
    const doubleEl = getTestEl('double-display').nativeElement;

    expect(countEl.textContent).toContain('Count: 0');
    expect(doubleEl.textContent).toContain('Double: 0');
  });

  it('should log correct output when count changes via button click', () => {
    spyOn(console, 'log');

    getTestEl('increment-btn').nativeElement.click();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith('Count changed', 1);
    expect(console.log).toHaveBeenCalledWith(1, 'is', 'odd');
  });
});
