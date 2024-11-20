import {Component, computed, effect, signal} from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  imports: [],
  templateUrl: './signals.component.html',
  styleUrl: './signals.component.scss'
})
export class SignalsComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  private countType = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));

  constructor() {
    effect(() => {
      console.log('Count changed', this.count());
      console.log(this.count(), 'is', this.countType());
    });
  }

  increment() {
    this.count.update(c => c + 1);
  }

  decrement() {
    this.count.update(c => c - 1);
  }

  reset() {
    this.count.set(0);
  }
}
