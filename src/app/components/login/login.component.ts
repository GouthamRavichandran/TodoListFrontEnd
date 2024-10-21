import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule }   from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    // Reset error message
    this.errorMessage = '';

    // Validate fields
    if (this.username.length < 3 || this.password.length < 3) {
      this.errorMessage = 'Username and/or password must be at least 3 characters long.';
      return;
    }

    // Call login service
    this.userService.login(this.username, this.password).subscribe({
      next: () => {
        // Navigate to dashboard after successful login
        this.router.navigateByUrl('/todolist')
      },
      error: (err) => {
        // Display login error message
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
}
