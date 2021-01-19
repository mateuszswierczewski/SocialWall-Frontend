export class Notification {

  constructor(
    public id: number,
    public type: NotificationType,
    public message: string,
  ) { }

}

export enum NotificationType {
  success,
  error,
  warn
}
