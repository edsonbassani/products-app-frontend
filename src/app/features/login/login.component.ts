import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        const token = response?.data?.data?.token; // Acessa o token corretamente
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/products']);
        } else {
          this.errorMessage = 'Token not found in the response';
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      },
    });
  }
}
