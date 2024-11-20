import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

import {TestClass} from "@app/interceptors/http-error.interceptor";
import {GreetingService} from "@app/services";

@Component({
  selector: 'app-greet-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './greet-input.component.html',
  styleUrl: './greet-input.component.scss'
})
export class GreetInputComponent implements OnInit {
  @ViewChild('msg') msg?: ElementRef<HTMLInputElement>;

  title = 'test-project';
  str: string = '';

  private readonly testClass = inject(TestClass);
  private readonly greetingService = inject(GreetingService);

  greeting = new FormControl<string>('', [])

  ngOnInit() {
    this.testClass.getData().subscribe(console.log);

    this.greetingService.message.subscribe(((val: string) => {
      this.greeting.setValue(String(val));
      console.log(val);
    }))
  }

  updateMsg(): void {
    this.greetingService.updateStr(this.msg?.nativeElement?.value)
  }
}
