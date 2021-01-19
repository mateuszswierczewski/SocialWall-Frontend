export interface CommentResponse {
  id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  textContent: string;
  createdDateTime: string;
  numberOfLikes: number;
  numberOfDislikes: number;
}
