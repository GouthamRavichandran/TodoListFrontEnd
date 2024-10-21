import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    if (this.userService.isAuthenticated()) {
      return true; // Successful User authentication
    } else {
      this.router.navigateByUrl('/login'); // Redirect to login upon failure
      return false;
    }
  }
}
