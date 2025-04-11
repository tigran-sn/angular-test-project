import { Component, inject, isDevMode, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestClass } from './interceptors/http-error.interceptor';
import { NavigationComponent } from '@app/components/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly testClass = inject(TestClass);
  readonly isDevMode = isDevMode();

  ngOnInit() {
    this.testClass.getData().subscribe(console.log);
  }
}
