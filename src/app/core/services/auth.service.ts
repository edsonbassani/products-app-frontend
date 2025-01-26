import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7181/api/auth';
  private loggedInSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  private usernameSubject = new BehaviorSubject<string | null>(this.getUsername());
  isLoggedIn$ = this.loggedInSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        const token = response?.data?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.loggedInSubject.next(true); // Notify logged-in state
          this.usernameSubject.next(this.getUsername()); // Update username
        }
        return response;
      })
    );
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false); // Notify logged-out state
    this.usernameSubject.next(null); // Clear username
  }

  getUsername(): string | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode JWT token payload
      return payload?.unique_name || payload?.name || null;
    }
    return null;
  }
}
