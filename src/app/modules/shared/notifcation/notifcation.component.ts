import { NotificationService } from './notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Notification, NotificationType } from './notification';

@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.css']
})
export class NotifcationComponent implements OnInit, OnDestroy {

  notifications: Notification[] = [];
  private subscription: Subscription;
  private i = 1;

  constructor(private notificationService: NotificationService) { }

  getI(): void {
    console.log(this.i++);
  }

  ngOnInit(): void {
    this.subscription = this.notificationService.getObservable().subscribe(
      notification => this.addNotification(notification)
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private addNotification(notification: Notification): void {
    this.notifications.push(notification);
    setTimeout(() => this.removeNotification(notification), 4000);
  }

  removeNotification(notification: Notification): void {
    this.notifications = this.notifications.filter(n => notification.id !== n.id);
  }

  notificationStyle(notification: Notification): string {

    let style: string;

    switch (notification.type) {
      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      case NotificationType.warn:
        style = 'warn';
        break;
    }

    return style;
  }

}
