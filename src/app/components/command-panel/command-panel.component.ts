import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TextReceiver} from "./text-receiver/text-receiver.component";
import { CommandManager } from "./command-manager/command-manager.component";
import {ChangeTextCommand} from "./change-text-command/change-text-command.component";

@Component({
  selector: 'app-command-panel',
  standalone: true,
  imports: [FormsModule, TextReceiver, CommandManager],
  templateUrl: './command-panel.component.html',
  styleUrl: './command-panel.component.scss'
})
export class CommandPanelComponent {
  currentText = '';

  private receiver = new TextReceiver();
  private commandManager = new CommandManager();

  applyChanges(): void {
    const command = new ChangeTextCommand(this.receiver, this.currentText);
    this.commandManager.executeCommand(command);
  }

  undo(): void {
    this.commandManager.undo();
    this.currentText = this.receiver.getText();
  }

  redo(): void {
    this.commandManager.redo();
    this.currentText = this.receiver.getText();
  }
}
