import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

export interface FooterItem {
  title: string;
  routerLink: string;
}

@Component({
  selector: 'lbd-footer',
  templateUrl: './lbd-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdFooterComponent {
  @Input()
  public copyright: string;

  @Input()
  public items: FooterItem[];

  constructor() { }
}
