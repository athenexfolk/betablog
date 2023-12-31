import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AvatarComponent } from '../../shared/components/users/avatar/avatar.component';
import { AuthorityService } from '../../core/auth/authority.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-mobile-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, AvatarComponent],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
})
export class MobileNavigationComponent implements OnInit {
  isLoggedIn = false;
  lastScrollTop = 0;
  isScrollDown = false;
  safeScrollZone = 64;
  isAccountMenuOpen = false;

  userId: string | null = null;

  constructor(
    private auth: AuthorityService,
    private oauth: OAuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedin;
    this.userId = this.auth.user_id;
  }

  toggleAccountMenu() {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop <= this.safeScrollZone) {
      this.isScrollDown = false;
      return;
    }

    this.isScrollDown = scrollTop > this.lastScrollTop;
    this.lastScrollTop = scrollTop;
  }

  login() {
    this.oauth.loadDiscoveryDocumentAndLogin();
  }

  logout() {
    if (confirm('คุณกำลังจะออกจากระบบใช่หรือไม่')) {
      this.auth.logout();
    }
  }
}
