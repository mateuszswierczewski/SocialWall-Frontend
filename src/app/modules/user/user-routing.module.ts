import { FollowersListComponent } from './followers-list/followers-list.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { WallComponent } from './wall/wall.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: '', component: DashboardComponent,
    children: [
      { path: '', component: WallComponent },
      { path: 'wall', component: WallComponent },
      { path: 'profile/:userId', component: ProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'followers', component: FollowersListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
