import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { CommentResponse } from 'src/app/models/responses/comment-response';
import { VoteService } from 'src/app/services/vote.service';
import { VoteRequest } from 'src/app/models/requests/vote-request';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input()
  comment: CommentResponse;


  constructor(
    private router: Router,
    private voteService: VoteService
    ) { }

  ngOnInit(): void {
  }

  getDate(): Date {
    const date = new Date(this.comment.createdDateTime);
    return date;
  }

  redirectToProfile(): void {
    this.router.navigate(['dashboard/profile/' + this.comment.userId]);
  }

  likeComment(): void {
    const voteRequest: VoteRequest = ({
      voteType: 'LIKE',
      commentId: this.comment.id
    });

    this.voteService.sendVoteRequest(voteRequest).subscribe(
      data => {
        //this.notificationService.success('You liked the post!');
        this.comment.numberOfLikes += 1;
      },
      error => {
        //this.notificationService.error('You can\'t like the post!');
      }
    );
  }

  dislikeComment(): void {
    const voteRequest: VoteRequest = ({
      voteType: 'DISLIKE',
      commentId: this.comment.id
    });

    this.voteService.sendVoteRequest(voteRequest).subscribe(
      data => {
       // this.notificationService.success('You disliked the post!');
        this.comment.numberOfDislikes += 1;
      },
      error => {
       // this.notificationService.error('You can\'t dislike the post!');
      }
    );
  }
}
