import { TextResponse } from './../models/responses/text-response';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PostResponse } from '../models/responses/post-response';
import { VoteResponse } from '../models/responses/vote-response';
import { VoteRequest } from '../models/requests/vote-request';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  sendPostRequest(request: FormData): Observable<PostResponse> {
    return this.http.post<PostResponse>('/api/posts', request);
  }

  getUserPosts(userId: string, page: number, pageSize: number = 10): Observable<Array<PostResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Array<PostResponse>>('/api/posts/byUser/' + userId, {params});
  }

  getPostsForUser(page: number, pageSize: number = 25): Observable<Array<PostResponse>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Array<PostResponse>>('/api/posts/forUser', {params});
  }

  deletePost(postId: string): Observable<string> {
    return this.http.delete('api/posts/' + postId, {responseType: 'text'});
  }
}
