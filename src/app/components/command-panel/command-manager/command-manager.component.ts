import { Component } from '@angular/core';
import {ICommand} from "@app/interfaces";

@Component({
  selector: 'app-command-manager',
  standalone: true,
  imports: [],
  templateUrl: './command-manager.component.html',
  styleUrl: './command-manager.component.scss'
})
export class CommandManager {
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];

  executeCommand(command: ICommand) {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = []; // clear redo stack on new action
  }

  undo(): void {
    if (this.undo.length === 0) return;
    const command = this.undoStack.pop();
    command?.undo()
    this.redoStack.push(command as ICommand);
  }

  redo(): void {
    if (this.redo.length === 0) return;
    const command = this.redoStack.pop();
    command?.execute();
    this.undoStack.push(command as ICommand);
  }
}
