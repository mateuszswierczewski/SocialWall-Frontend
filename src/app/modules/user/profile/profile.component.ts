import { PhotoService } from './../../../services/photo.service';
import { AuthService } from './../../../services/auth.service';
import { PostService } from './../../../services/post.service';
import { PostResponse } from './../../../models/responses/post-response';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/models/responses/user-info';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  userInfo: UserInfo;
  posts: PostResponse[] = [];
  private currentPostPage = 1;
  isNoMorePosts = false;
  private requestIsSend = false;

  actionButtonName = 'Action';
  actionButtonName2 = 'More information';
  informationBarOpened = false;

  showActionButton = false;
  defaultPhoto = '/assets/default_user.png';
  userPhoto: any;


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private authService: AuthService,
    private photoService: PhotoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId');
    this.userService.getUserInfo(userId).subscribe(
      data => this.userInfo = data
    );

    if (this.authService.currentUserInfo.userId === userId) {
      this.actionButtonName = 'Edit profile';
      this.showActionButton = true;
    } else {
      this.userService.isFollowing(userId).subscribe(
        data => {
          if (data) {
            this.actionButtonName = 'Unfollow';
          } else {
            this.actionButtonName = 'Follow';
          }
          this.showActionButton = true;
        }
      );
    }
   // this.loadProfileImage(userId);
    this.loadPosts();
  }

  takeProfileAction(): void {
    if (this.actionButtonName === 'Edit profile') {
      this.redirectToProfileEdit();
    } else if (this.actionButtonName === 'Follow') {
      this.followUser();
    } else {
      this.unfollowUser();
    }
  }

  redirectToProfileEdit(): void {
    this.router.navigate(['dashboard/edit-profile']);
  }

  followUser(): void {
    this.userService.followUser(this.userInfo.userId);
    this.userInfo.numberOfFollowers += 1;
    this.actionButtonName = 'Unfollow';
  }

  unfollowUser(): void {
    this.userService.unfollowUser(this.userInfo.userId);
    this.userInfo.numberOfFollowers -= 1;
    this.actionButtonName = 'Follow';
  }

  toggleInformationBar(): void {
    if (this.informationBarOpened === true) {
      this.closeInformationBar();
    } else {
      this.openInformationBar();
    }
  }

  closeInformationBar(): void {
    this.actionButtonName2 = 'More information';
    this.informationBarOpened = false;
  }

  openInformationBar(): void {
    this.actionButtonName2 = 'Less information';
    this.informationBarOpened = true;
  }

  loadProfileImage(userId: string): void {
    this.photoService.getUserPhoto(userId).subscribe(
      data => {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.userPhoto = reader.result;
        }, false);

        if (data) {
          reader.readAsDataURL(data);
        }
      }
    );
  }

  getFullname(): string {
    let fullname = this.userInfo?.firstName + ' ' + this.userInfo?.lastName;
    if (this.userInfo?.birthDate != null) {
      const timeDiff = Math.abs(Date.now() - new Date(this.userInfo?.birthDate).getTime());
      const age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
      fullname = fullname.concat(' (' + age + ')');
    }
    return fullname;
  }

  loadPosts(): void {
    if (!this.isNoMorePosts && !this.requestIsSend) {
      this.requestIsSend = true;
      this.postService.getUserPosts(this.route.snapshot.paramMap.get('userId'), this.currentPostPage).subscribe(
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
