import { AuthService } from './../../../services/auth.service';
import { UserInfo } from './../../../models/responses/user-info';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouteReuseStrategy } from '@angular/router';
import { UserBasicInfo } from 'src/app/models/responses/user-basic-info';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUserInfo: UserInfo;
  private pageNumber = 1;
  users = new Array<UserBasicInfo>();

  isListOfFoundUsersOpen = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  openedMenu = false;

  toggleMenu(): void {
    if (this.openedMenu) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
    this.openedMenu = !this.openedMenu;
  }

  openMenu(): void {
    document.getElementById('menu-sidebar').style.right = '0px';
  }

  closeMenu(): void {
    document.getElementById('menu-sidebar').style.right = '-350px';
  }

  ngOnInit(): void {
    this.currentUserInfo = this.authService.currentUserInfo;
  }

  redirectToUserProfile(): void {
    this.router.navigate(['dashboard/profile/' + this.authService.currentUserInfo.userId]);
    this.toggleMenu();
  }

  redirectToFoundUserProfile(userId: string): void {
    this.router.navigate(['dashboard/profile/' + userId]);
  }

  findUserByName(name: string, event: Event): void {
    event.stopPropagation();
    if (name.length > 0) {
      this.userService.findUserByName(name, this.pageNumber).subscribe(
        data => {
          this.users = data;
        }
      );
    }
    this.isListOfFoundUsersOpen = true;
  }

  showListOfFoundUsers(): void {
    if (this.users.length > 0) {
        this.isListOfFoundUsersOpen = true;
    }
  }

  hideListOfFoundUsers(): void {
    this.isListOfFoundUsersOpen = false;
  }

  getProfileImage(userId: string): string {
    return '/assets/default_user.png';
  }

  redirectToSettings(): void {
    this.router.navigate(['dashboard/edit-profile']);
  }

}
