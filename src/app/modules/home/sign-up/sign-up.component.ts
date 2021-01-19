import { UserService } from './../../../services/user.service';
import { SignUpRequest } from './../../../models/requests/sign-up-request';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpFormGroup: FormGroup;

  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthService,
      private userService: UserService,
      private router: Router) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signUpFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(255)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required]
    });
  }

  get usernameFormControl(): AbstractControl {
    return this.signUpFormGroup.get('username');
  }

  get passwordFormControl(): AbstractControl {
    return this.signUpFormGroup.get('password');
  }

  get emailFormControl(): AbstractControl {
    return this.signUpFormGroup.get('email');
  }

  get firstNameFormControl(): AbstractControl {
    return this.signUpFormGroup.get('firstName');
  }

  get lastNameFormControl(): AbstractControl {
    return this.signUpFormGroup.get('lastName');
  }

  get birthDateFormControl(): AbstractControl {
    return this.signUpFormGroup.get('birthDate');
  }

  get genderFormControl(): AbstractControl {
    return this.signUpFormGroup.get('gender');
  }

  signUp(): void {
    const request: SignUpRequest = ({
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
      email: this.emailFormControl.value,
      firstName: this.firstNameFormControl.value,
      lastName: this.lastNameFormControl.value,
      birthDate: this.birthDateFormControl.value,
      gender: this.genderFormControl.value
    });

    this.authService.sendSignUpRequest(request).subscribe(
      data => {
        this.router.navigate(['/sign-in']);
      }
    );
  }

}
