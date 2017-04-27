import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {NotificationService, NotificationType, NotificationOptions} from '../lbd/services/notification.service';
import { NavbarTitleService } from '../lbd/services/navbar-title.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations: [
    trigger('cardnotifications', [
      state('*', style({
        '-ms-transform': 'translate3D(0px, 0px, 0px)',
        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
        '-moz-transform': 'translate3D(0px, 0px, 0px)',
        '-o-transform': 'translate3D(0px, 0px, 0px)',
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1})),
      transition('void => *', [
        style({opacity: 0,
          '-ms-transform': 'translate3D(0px, 150px, 0px)',
          '-webkit-transform': 'translate3D(0px, 150px, 0px)',
          '-moz-transform': 'translate3D(0px, 150px, 0px)',
          '-o-transform': 'translate3D(0px, 150px, 0px)',
          transform: 'translate3D(0px, 150px, 0px)',
        }),
        animate('0.3s 0s ease-out')
      ])
    ])
  ]
})
export class NotificationsComponent implements OnInit {

  constructor(private navbarTitleService: NavbarTitleService, private notificationService: NotificationService) { }

  public ngOnInit() {
    this.navbarTitleService.updateTitle('Notifications');
  }

  public showNotification(from: string, align: string) {
    const type = Math.floor((Math.random() * 4) + 1);

    this.notificationService.notify(new NotificationOptions({
      message: 'Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for every web developer.',
      icon: 'pe-7s-gift',
      type: <NotificationType>(type),
      from: from,
      align: align
    }));
  }
}
