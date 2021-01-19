import { UserBasicInfo } from './user-basic-info';
export interface PostResponse {
  postId: string;
  postType: string;
  numberOfComments: number;
  numberOfLikes: number;
  numberOfDislikes: number;
  createdDateTime: string;
  textContent: string;
  imagesLinks: string[];
  userBasicInfo: UserBasicInfo;
}
