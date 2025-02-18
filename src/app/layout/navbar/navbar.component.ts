import { Component, inject, input, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

 readonly authService= inject(AuthService)
  isLogin=input<boolean>(true)
  isScrolled = false;
  isHomePage = false;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home';
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isHomePage) {
      this.isScrolled = window.scrollY > 590;
    }
  }
}


