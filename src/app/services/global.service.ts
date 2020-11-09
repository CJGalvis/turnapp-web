import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public isRunning: Subject<boolean>;
  public nameApp: string = 'turnapp';

  constructor() {
    this.isRunning = new Subject<boolean>();
  }

  changeRunning(value: boolean) {
    this.isRunning.next(value);
  }

  getRunning(): Observable<any> {
    return this.isRunning.asObservable();
  }
}
