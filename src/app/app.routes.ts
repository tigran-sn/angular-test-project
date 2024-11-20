import {Routes} from '@angular/router';
import {CommandPanelComponent} from "@app/components/command-panel/command-panel.component";
import {HomeComponent} from "@app/components/home/home.component";
import {GreetInputComponent} from "@app/components/greet-input/greet-input.component";
import {SignalsComponent} from "@app/components/signals/signals.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: HomeComponent, title: 'Home' },
  {
    path: 'command-panel',
    component: CommandPanelComponent,
    title: 'Command Panel',
  },
  {
    path: 'greet-input',
    component: GreetInputComponent,
    title: 'Greet Input'
  },
  {
    path: 'signals',
    component: SignalsComponent,
    title: 'Signals'
  }
  // {
  //   path: '**',
  //   component: ,
  // }
];
