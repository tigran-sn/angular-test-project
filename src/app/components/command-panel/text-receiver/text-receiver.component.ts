import { Component } from '@angular/core';

@Component({
  selector: 'app-text-receiver',
  standalone: true,
  imports: [],
  templateUrl: './text-receiver.component.html',
  styleUrl: './text-receiver.component.scss'
})
export class TextReceiver {
  private text = '';

  getText(): string {
    return this.text;
  }

  setText(value: string): void {
    this.text = value;
    console.log('text is now: ', this.text);
  }
}
