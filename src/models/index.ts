import Notification, { NotificationModelStatic } from './Notification';
import Review, { ReviewModelStatic } from './Review';
import User, { UserModelStatic } from './User';

export default {
  Notification,
  User,
  Review,
};

export interface ModelType {
  User: UserModelStatic;
  Review: ReviewModelStatic;
  Notification: NotificationModelStatic;
};
