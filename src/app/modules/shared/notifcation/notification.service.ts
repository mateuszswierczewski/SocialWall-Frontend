import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Notification, NotificationType } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<Notification>();
  private index = 0;

  constructor() { }

  getObservable(): Observable<Notification> {
    return this.subject.asObservable();
  }

  success(message: string): void {
    this.subject.next(new Notification(this.index++, NotificationType.success, message));
  }

  error(message: string): void {
    this.subject.next(new Notification(this.index++, NotificationType.error, message));
  }

  warn(message: string): void {
    this.subject.next(new Notification(this.index++, NotificationType.warn, message));
  }

}
