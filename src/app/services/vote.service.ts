import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoteResponse } from '../models/responses/vote-response';
import { VoteRequest } from '../models/requests/vote-request';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { }

  sendVoteRequest(voteRequest: VoteRequest): Observable<VoteResponse> {
    return this.http.post<VoteResponse>('api/votes', voteRequest);
  }
}
