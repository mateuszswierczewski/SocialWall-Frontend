import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { SignInRequest } from 'src/app/models/requests/sign-in-request';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInFormGroup: FormGroup;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }


  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.signInFormGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get usernameFormControl(): AbstractControl {
    return this.signInFormGroup.get('username');
  }

  get passwordFormControl(): AbstractControl {
    return this.signInFormGroup.get('password');
  }

  signIn(): void {
    const request: SignInRequest = ({
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value
    });
    this.authService.sendSignInRequest(request).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['dashboard']);
      },
      err => {
        console.error(err);
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 504:
              this.error = 'Connection error with the server!';
              break;
            case 401:
              this.error = 'Wrong login or password!';
          }
        }
      }
    );
  }

}
