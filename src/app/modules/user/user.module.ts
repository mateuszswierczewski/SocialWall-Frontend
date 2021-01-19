import { FollowersListComponent } from './followers-list/followers-list.component';
import { SharedModule } from './../shared/shared.module';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { WallComponent } from './wall/wall.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { UserInfoShortComponent } from './user-info-short/user-info-short.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    WallComponent,
    EditProfileComponent,
    AddPostComponent,
    PostComponent,
    CommentComponent,
    FollowersListComponent,
    UserInfoShortComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class UserModule { }
