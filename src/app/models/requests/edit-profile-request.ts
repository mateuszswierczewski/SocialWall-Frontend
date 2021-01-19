export interface EditProfileRequest {
  username: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  city?: string;
  country?: string;
  description?: string;
}
