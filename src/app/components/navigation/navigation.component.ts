import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  menuItems = [
    { path: '/home', label: 'Home' },
    { path: '/command-panel', label: 'Command Panel' },
    { path: '/greet-input', label: 'Greet Input' },
    { path: '/signals', label: 'Signals' }
  ];
}
