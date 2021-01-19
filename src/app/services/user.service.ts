import { UserBasicInfo } from './../models/responses/user-basic-info';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TextResponse } from '../models/responses/text-response';
import { UserInfo } from '../models/responses/user-info';
import { EditProfileRequest } from '../models/requests/edit-profile-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public existsByUsername(username: string): boolean {
    let result: boolean;
    this.http.get<TextResponse>('api/auth/existsByUsername/' + username).subscribe(
      data => result = JSON.parse(data.response)
    );
    return result;
  }

  public getUserInfo(userId: string): Observable<UserInfo> {
    return this.http.get<UserInfo>('api/users/' + userId);
  }

  public followUser(userId: string): boolean{
    let result: boolean;
    this.http.post<boolean>('api/users/follow/' + userId, null).subscribe(
      data => result = data
    );
    return result;
  }

  public unfollowUser(userId: string): boolean{
    let result: boolean;
    this.http.post<boolean>('api/users/unfollow/' + userId, null).subscribe(
      data => result = data
    );
    return result;
  }

  public isFollowing(userId: string): Observable<boolean> {
    return this.http.get<boolean>('api/users/isFollowing/' + userId);
  }

  public findUserByName(name: string, page: number, pageSize: number = 25): Observable<Array<UserBasicInfo>> {
    const params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Array<UserBasicInfo>>('api/users/findBy', {params});
  }

  public updateProfile(request: EditProfileRequest): Observable<UserInfo>{
    return this.http.post<UserInfo>('api/users/editProfile', request);
  }
}
