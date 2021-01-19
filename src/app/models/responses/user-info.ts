export interface UserInfo{
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  birthDate?: Date;
  gender?: string;
  city?: string;
  country?: string;
  description?: string;
  numberOfFollowing: number;
  numberOfFollowers: number;
}
