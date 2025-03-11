import { Component, inject, input, HostListener, OnInit, signal, computed, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],

templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{



  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isHomePage = this.router.url === '/home';
    });
  }
  readonly authService= inject(AuthService)
  private readonly cartService = inject(CartService)
  private readonly wishlistService = inject(WishlistService)
  isLogin=input<boolean>(true)
  isScrolled = false;
  isHomePage = false;
  countCart:Signal<number> = computed(()=> this.cartService.cartNumber())
  countWishList:Signal<number>= computed(()=>this.wishlistService.wishListNumber())

  isDropdownOpen = false;
  isSubDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (!this.isDropdownOpen) {
      this.isSubDropdownOpen = false; 
    }
  }

  toggleSubDropdown() {
    this.isSubDropdownOpen = !this.isSubDropdownOpen;
  }



  ngOnInit(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cartService.cartNumber.set(res.numOfCartItems)


      }
    })

    this.wishlistService.getLoggedUserWishList().subscribe({
      next:(res)=>{
        this.wishlistService.wishListNumber.set(res.data.length)


      }

    })
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isHomePage) {
      this.isScrolled = window.scrollY > 590;
    }
  }
}


