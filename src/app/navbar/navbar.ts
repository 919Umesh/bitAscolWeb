import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/api/auth';
import { Router } from '@angular/router';
import { ThemeService } from '../services/core/theme';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  menuOpen = false;
  auth = inject(Auth);
  private router = inject(Router);
  theme = inject(ThemeService)

  toggleMenu() { this.menuOpen = !this.menuOpen; }
  closeMenu() { this.menuOpen = false; }
  toggleTheme() { this.theme.toggle(); }

  async logout() {
    await this.auth.logout();
    this.closeMenu();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
