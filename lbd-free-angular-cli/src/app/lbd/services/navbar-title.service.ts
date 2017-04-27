import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NavbarTitleService {
  private titleChangedSource = new Subject<string>();

  public titleChanged$ = this.titleChangedSource.asObservable();

  constructor() { }

  public updateTitle(title: string) {
    this.titleChangedSource.next(title);
  }
}
