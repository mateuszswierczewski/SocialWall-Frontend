import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  static userPhotos = new Map<string, File>();

  constructor(private http: HttpClient) { }

  uploadProfilePhoto(request: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.http.post('api/users/profileImage/upload', request, {headers});
  }

  getUserPhoto(userId: string): Observable<Blob> {
    return this.http.get<Blob>('api/users/profileImage/download/' + userId);
  }

}
