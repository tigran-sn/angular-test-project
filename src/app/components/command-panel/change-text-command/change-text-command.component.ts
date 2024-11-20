import {Component, Inject, InjectionToken} from '@angular/core';
import {ICommand} from "@app/interfaces";
import {TextReceiver} from "../text-receiver/text-receiver.component";


export const NEW_TEXT = new InjectionToken<string>('newText');

@Component({
  selector: 'app-change-text-command',
  standalone: true,
  imports: [],
  templateUrl: './change-text-command.component.html',
  styleUrl: './change-text-command.component.scss'
})
export class ChangeTextCommand implements ICommand{
  private oldText;
  private newText;

  constructor(private receiver: TextReceiver, @Inject(NEW_TEXT) newText: string) {
    this.oldText = receiver.getText();
    this.newText = newText;
  }

  execute(): void {
    this.receiver.setText(this.newText);
  }

  undo(): void {
    this.receiver.setText(this.oldText);
  }

}
