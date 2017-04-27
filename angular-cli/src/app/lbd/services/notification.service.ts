import { Injectable } from '@angular/core';

export enum NotificationType {
  Info = 1,
  Success,
  Warning,
  Danger
}

export class NotificationOptions {
  public message: string;
  public icon: string = null;
  public timer = 4000;
  public type: NotificationType = NotificationType.Info;
  public from = 'top';
  public align = 'right';

  public constructor(
    fields: {
      message: string,
      icon?: string,
      timer?: number,
      type?: NotificationType,
      from?: string,
      align?: string
    }) {

    this.message = fields.message;
    this.icon = fields.icon || this.icon;
    this.timer = fields.timer || this.timer;
    this.type = fields.type || this.type;
    this.from = fields.from || this.from;
    this.align = fields.align || this.align;
  }
}

@Injectable()
export class NotificationService {

  constructor() { }

  public notify(options: NotificationOptions): void {
    let typeString;
    switch (options.type) {
      case NotificationType.Success:
        typeString = 'success';
        break;
      case NotificationType.Warning:
        typeString = 'warning';
        break;
      case NotificationType.Danger:
        typeString = 'danger';
        break;
      default:
        typeString = 'info';
        break;
    }

    $.notify(
      {
        icon: options.icon,
        message: options.message
      },
      {
        type: typeString,
        timer: options.timer,
        placement: {
          from: options.from,
          align: options.align
        }
      });
  }
}
