import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:9090/user'; // Backend URL
  private userId: number | null = null; // Store user ID

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { userName: username, password }).pipe(
      tap(user => {
        this.userId = user.id; // Store user ID
      })
    );
  }

  getUserId(): number | null {
    return this.userId;
  }

  logout(): void {
    this.userId = null; // Clear user ID
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    console.log(this.userId);
    return this.userId !== null; // Check if user is logged in
  }
}
