import {Component, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'lbd-user-profile',
  templateUrl: './lbd-user-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LbdUserProfileComponent {
  @Input()
  backgroundImage: string;

  @Input()
  avatarImage: string;

  @Input()
  name: string;

  @Input()
  username: string;

  @Input()
  about: string;

  constructor() { }
}
