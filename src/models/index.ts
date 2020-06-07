import Notification, { NotificationModelStatic } from './Notification';
import Post, { PostModelStatic } from './Post';
import User, { UserModelStatic } from './User';

export default {
  Notification,
  User,
  Post,
};

export interface ModelType {
  User: UserModelStatic;
  Post: PostModelStatic;
  Notification: NotificationModelStatic;
}
