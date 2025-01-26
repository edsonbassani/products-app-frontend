import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isAuthenticated()) {
      // Usuário autenticado → Produtos
      this.router.navigate(['/products']);
    } else {
      // Usuário não autenticado → Login
      this.router.navigate(['/login']);
    }
  }
}
