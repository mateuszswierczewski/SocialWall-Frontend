import { CommentRequest } from './../models/requests/comment-request';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentResponse } from '../models/responses/comment-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getAllCommentsByPostId(postId: string): Observable<Array<CommentResponse>> {
    return this.http.get<Array<CommentResponse>>('api/comments/byPost/' + postId);
  }

  sendCommentRequest(request: CommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>('api/comments', request);
  }
}
