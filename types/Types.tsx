export interface CommentType {
  id: string;
  text: string;
  userName: string | undefined;
  userId: string;
  createdAt: Date;
}
