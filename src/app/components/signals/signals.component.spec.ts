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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display initial count and double', () => {
    const countEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(1)')
    ).nativeElement;
    const doubleEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(2)')
    ).nativeElement;

    expect(countEl.textContent).toContain('Count: 0');
    expect(doubleEl.textContent).toContain('Double: 0');
  });

  it('should increment count and update double', () => {
    component.increment();
    fixture.detectChanges();

    const countEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(1)')
    ).nativeElement;
    const doubleEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(2)')
    ).nativeElement;

    expect(countEl.textContent).toContain('Count: 1');
    expect(doubleEl.textContent).toContain('Double: 2');
  });

  it('should decrement count and update double', () => {
    component.count.set(2); // preset state
    component.decrement();
    fixture.detectChanges();

    const countEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(1)')
    ).nativeElement;
    const doubleEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(2)')
    ).nativeElement;

    expect(countEl.textContent).toContain('Count: 1');
    expect(doubleEl.textContent).toContain('Double: 2');
  });

  it('should reset count to 0 and update double', () => {
    component.count.set(10);
    component.reset();
    fixture.detectChanges();

    const countEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(1)')
    ).nativeElement;
    const doubleEl = fixture.debugElement.query(
      By.css('.display-values div:nth-child(2)')
    ).nativeElement;

    expect(countEl.textContent).toContain('Count: 0');
    expect(doubleEl.textContent).toContain('Double: 0');
  });

  it('should trigger effect and log changes when count changes', () => {
    spyOn(console, 'log');

    component.increment();
    fixture.detectChanges();

    expect(console.log).toHaveBeenCalledWith('Count changed', 1);
    expect(console.log).toHaveBeenCalledWith(1, 'is', 'odd');
  });
});
