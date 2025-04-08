import { Component, OnInit } from '@angular/core';

declare var particlesJS: any;

@Component({
  selector: 'app-particles',
  standalone: true,
  imports: [],
  templateUrl: './particles.component.html',
  styleUrl: './particles.component.scss',
})
export class particlesComponent implements OnInit {
  ngOnInit(): void {
    particlesJS.load('particles', 'assets/particles.json', () => {
      console.log('callback - particles.js config loaded');
    });
  }
}
