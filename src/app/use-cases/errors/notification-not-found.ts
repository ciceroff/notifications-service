export class NotificationNotFound extends Error {
  constructor() {
    super('There is no notification for this id');
  }
}
