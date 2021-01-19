import { SignUpRequest } from './../models/requests/sign-up-request';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignInRequest } from '../models/requests/sign-in-request';
import { tap } from 'rxjs/operators';
import { UserInfo } from '../models/responses/user-info';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  sendSignUpRequest(request: SignUpRequest): Observable<any>{
    return this.http.post('/api/auth/signUp', request);
  }

  sendSignInRequest(request: SignInRequest): Observable<HttpResponse<Response>>{
    return this.http.post<Response>('/api/auth/signIn', request, {observe: 'response'})
      .pipe(
        tap(
          data => {
            const token: string = data.headers.get('Authorization');
            this.saveToken(token);
            this.loadSignedInUserInfos();
          }
        )
      );
  }

  loadSignedInUserInfos(): void {
    this.http.get<UserInfo>('/api/users/currentUser').subscribe(
      data => {
          const currentSignedInUserInfo: UserInfo = data;
          localStorage.setItem('UserInfo', JSON.stringify(currentSignedInUserInfo));
      }
    );
  }

  private saveToken(token: string): void {
    console.log(token);
    localStorage.setItem('Authorization', token);
  }

  static get authorizationToken(): string {
    return localStorage.getItem('Authorization');
  }

  get currentUserInfo(): UserInfo {
    return JSON.parse(localStorage.getItem('UserInfo'));
  }
}
