import { AuthService } from './../../../services/auth.service';
import { CommentRequest } from './../../../models/requests/comment-request';
import { CommentService } from './../../../services/comment.service';
import { NotificationService } from './../../shared/notifcation/notification.service';
import { PostService } from './../../../services/post.service';
import { UserInfo } from './../../../models/responses/user-info';
import { PostResponse } from './../../../models/responses/post-response';
import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { VoteRequest } from 'src/app/models/requests/vote-request';
import { VoteService } from 'src/app/services/vote.service';
import { Router } from '@angular/router';
import { CommentResponse } from 'src/app/models/responses/comment-response';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input()
  post: PostResponse;
/*
  @Input()
  userInfo: UserInfo;
*/
  @Output()
  delete: EventEmitter<string> = new EventEmitter();

  commentAreaVisible = false;
  commentText: string = null;

  comments: CommentResponse[] = [];

  isMenuOpen = false;

  constructor(
    private voteService: VoteService,
    private notificationService: NotificationService,
    private commentService: CommentService,
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  getDate(): Date {
    const date = new Date(this.post.createdDateTime);
    return date;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDay() === today.getDay();
  }

  likePost(): void {
    const voteRequest: VoteRequest = ({
      voteType: 'LIKE',
      postId: this.post.postId
    });

    this.voteService.sendVoteRequest(voteRequest).subscribe(
      data => {
        this.notificationService.success('You liked the post!');
        this.post.numberOfLikes += 1;
      },
      error => {
        this.notificationService.error('You can\'t like the post!');
      }
    );
  }

  dislikePost(): void {
    const voteRequest: VoteRequest = ({
      voteType: 'DISLIKE',
      postId: this.post.postId
    });

    this.voteService.sendVoteRequest(voteRequest).subscribe(
      data => {
        this.notificationService.success('You disliked the post!');
        this.post.numberOfDislikes += 1;
      },
      error => {
        this.notificationService.error('You can\'t dislike the post!');
      }
    );
  }

  redirectToProfile(): void {
    this.router.navigate(['dashboard/profile/' + this.post.userBasicInfo.userId]);
  }

  toggleCommentsArea(): void {
    if (this.comments === null || this.comments.length === 0) {
      this.loadComments();
    }

    if (this.commentAreaVisible) {
      this.commentAreaVisible = false;
    } else {
      this.commentAreaVisible = true;
    }
  }

  loadComments(): void {
    this.commentService.getAllCommentsByPostId(this.post.postId).subscribe(
      data => {
        this.comments = this.comments.concat(data);
      },
      error => {
        this.notificationService.error('Error loading comments!');
      }
    );
  }

  sendComment(): void {
    if (this.commentText != null) {
      const request: CommentRequest = ({
        postId: this.post.postId,
        textContent: this.commentText
      });

      this.commentService.sendCommentRequest(request).subscribe(
        data => {
          this.comments.push(data);
          this.post.numberOfComments += 1;
          this.commentText = null;
        },
        error => {
          this.notificationService.error('Can\'t send comment!');
        }
      );
    } else {
      this.notificationService.error('Comment must contain at lest 1 character!');
    }
  }

  toggleMenu(e: Event): void {
    this.isMenuOpen = !this.isMenuOpen;
    e.stopPropagation();
  }

  closeMenu(e: Event): void {
    console.log('close');
    this.isMenuOpen = false;
  }

  isTheAuthorOfThePost(): boolean {
    return this.authService.currentUserInfo.userId === this.post.userBasicInfo.userId;
  }

  deletePost(): void {
    this.postService.deletePost(this.post.postId)
    .subscribe(
      data => {
        this.delete.emit(this.post.postId);
        this.notificationService.success('Post deleted!');
      },
      error => {
        console.error(error);
        this.notificationService.error('Post cannot be deleted!');
      }
    );
    this.isMenuOpen = false;
  }

  reportPost(): void {}

}
