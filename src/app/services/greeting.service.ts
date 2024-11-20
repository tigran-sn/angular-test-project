import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

Injectable({
  providedIn: "root",
})
export class GreetingService {
  private message$ = new BehaviorSubject('Initial HELLO!');
  message = this.message$.asObservable();

  updateStr(msg: string = ''): void {
    this.message$.next(msg);
  }
}
