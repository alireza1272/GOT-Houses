import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  public isLoadingSubject: ReplaySubject<boolean> = new ReplaySubject(1);
  public showLoading = this.isLoadingSubject.asObservable();

  public buttonClickedSubject: ReplaySubject<boolean> = new ReplaySubject(1);
  public buttonLoading = this.buttonClickedSubject.asObservable();
  constructor() {
  }
}
