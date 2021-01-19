import { NotificationService } from './../../shared/notifcation/notification.service';
import { PhotoService } from './../../../services/photo.service';
import { AuthService } from './../../../services/auth.service';
import { UserInfo } from './../../../models/responses/user-info';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { EditProfileRequest } from 'src/app/models/requests/edit-profile-request';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  editProfileForm: FormGroup ;
  userInfo: UserInfo;
  photo: File;

  photoLink = '/assets/default_user.png';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notificationSevice: NotificationService,
    private photoService: PhotoService
  ) { }

  ngOnInit(): void {
    this.userInfo = this.authService.currentUserInfo;
    this.createForm();
  }

  getProfileImage(): string {
    return '/assets/default_user.png';
  }

  createForm(): void {
    this.editProfileForm = this.formBuilder.group({
      username: [this.userInfo.username, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      firstName: [this.userInfo.firstName, [Validators.required, Validators.maxLength(50)]],
      lastName: [this.userInfo.lastName, [Validators.required, Validators.maxLength(50)]],
      birthDate: [this.userInfo.birthDate, Validators.required],
      city: [this.userInfo.city, Validators.maxLength(50)],
      country: [this.userInfo.country, Validators.maxLength(50)],
      description: [this.userInfo.description, Validators.maxLength(255)]
    });
  }

  get usernameFormControl(): AbstractControl {
    return this.editProfileForm.get('username');
  }

  get firstNameFormControl(): AbstractControl {
    return this.editProfileForm.get('firstName');
  }

  get lastNameFormControl(): AbstractControl {
    return this.editProfileForm.get('lastName');
  }

  get birthDateFormControl(): AbstractControl {
    return this.editProfileForm.get('birthDate');
  }

  get cityFormControl(): AbstractControl {
    return this.editProfileForm.get('city');
  }

  get countryFormControl(): AbstractControl {
    return this.editProfileForm.get('country');
  }

  get descriptionFormControl(): AbstractControl {
    return this.editProfileForm.get('description');
  }

  loadPhoto(files: File[]): void {
    if (files[0].type === 'image/jpeg' || files[0].type === 'image/gif' || files[0].type === 'image/png') {
      this.photo = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = (event) => {
        this.photoLink = reader.result.toString();
      };
    } else {
      this.notificationSevice.error('File is not a photo!');
    }
  }

  uploadPhoto(): void {
    if (this.photo !== null) {
      const request = new FormData();
      request.append('photo', this.photo, this.photo.name);

      this.photoService.uploadProfilePhoto(request).subscribe(
        data => {
          this.notificationSevice.success('Photo upload succesfully!');
          this.authService.loadSignedInUserInfos();
        },
        error => {
          this.notificationSevice.error('Failed to upload a photo!');
        }
      );
    }
  }


  sendEditUserProfileRequest(): void {
    const request: EditProfileRequest = ({
      username: this.usernameFormControl.value,
      firstName: this.firstNameFormControl.value,
      lastName: this.lastNameFormControl.value,
      birthDate: this.birthDateFormControl.value,
      city: this.cityFormControl.value,
      country: this.countryFormControl.value,
      description: this.descriptionFormControl.value
    });

    this.userService.updateProfile(request).subscribe(
      data => localStorage.setItem('UserInfo', JSON.stringify(data))
    );
  }


}
