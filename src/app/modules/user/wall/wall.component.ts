import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { PostResponse } from 'src/app/models/responses/post-response';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  posts: PostResponse[] = [];

  private currentPostPage = 1;
  isNoMorePosts = false;
  private requestIsSend = false;

  constructor(
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    if (!this.isNoMorePosts && !this.requestIsSend) {
      this.requestIsSend = true;
      this.postService.getPostsForUser(this.currentPostPage).subscribe(
        data => {
          this.posts = this.posts.concat(data);
          if (data.length !== 0) {
            this.currentPostPage++;
          } else {
            this.isNoMorePosts = true;
          }
          this.requestIsSend = false;
        }
      );
    }
  }

  deletePost(postId: string): void {
    console.log('ttuuu');
    this.posts = this.posts.filter(post => post.postId !== postId);
  }

}
