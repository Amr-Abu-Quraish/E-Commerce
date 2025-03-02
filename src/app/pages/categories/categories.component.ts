import { Component,inject, OnInit} from '@angular/core';


import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';

import { CartService } from '../../core/services/cart/cart.service';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-categories',
  imports: [TabsModule ,CommonModule ,RouterLink,Toast,ButtonModule ],
  providers: [MessageService],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {



 constructor(
            private messageService:MessageService
 ) {}


  private readonly  productsService = inject(ProductsService)
  private readonly  categoriesService = inject(CategoriesService)
  private readonly  cartService = inject(CartService)
  private readonly  wishlistService = inject(WishlistService)

  products:Iproduct[] = []
  categoris:Icategory[] = []
  isAddLoading:{[key:string]:boolean}={}

  isInWishlist(id: string): boolean {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return storedWishlist.includes(id);
  }







 getProductsData():void{
  this.productsService.getAllProducts().subscribe({
    next:(res)=>{
      console.log(res.data)
    this.products= res.data
    },
    error:(err)=>{
      console.log(err)
    },
   })
 }

 getCategoryData():void{

  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res.data)
    this.categoris= res.data
    },
    error:(err)=>{
      console.log(err)
    },
  })
 }


 ngOnInit(): void {
  this.getProductsData()
  this. getCategoryData()
 }





 getFullStars(rating: number): number[] {
  return Array(Math.floor(rating)).fill(0);
}

getHasHalfStar(rating: number): boolean {
  return rating % 1 !== 0;
}


selectedTab: string = 'Electronic';

updateTabName(tabName: string) {
  this.selectedTab = tabName;
}





  addToCart(id:string):void{



    this.isAddLoading[id] = true;

    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        console.log(res)

        this.cartService.cartNumber.set(res.numOfCartItems)

        console.log(this.cartService.cartNumber())

        setTimeout(() => {
          this.isAddLoading[id] = false;

          this.showSuccess1();
        }, 1500);


      },
      error:(err)=>{
        console.log(err)
        this.isAddLoading[id]=false

      }
    })

  }


  // addToWishList(id:string):void{
  //   this.wishlistService.addProductToWishList(id).subscribe({
  //     next:(res)=>{

  //       console.log(res)
  //       this.wishlistService.wishListNumber.set(res.data.length)
  //       this.showSuccess2()

  //     },
  //     error:(err)=>{

  //       console.log(err)

  //     }
  //   })
  // }

  toggleWishlist(id: string): void {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    const index = storedWishlist.indexOf(id);

    if (index === -1) {
      this.wishlistService.addProductToWishList(id).subscribe({
        next: (res) => {
          storedWishlist.push(id);
          localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
          this.wishlistService.wishListNumber.set(res.data.length);
          this.showSuccess2();
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    } else {

      this.wishlistService.removeItemFromWishList(id).subscribe({
        next: () => {
          storedWishlist.splice(index, 1);
          localStorage.setItem('wishlist', JSON.stringify(storedWishlist));
          this.wishlistService.wishListNumber.set(storedWishlist.length);
          this.showSuccess3()
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  showSuccess3() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product removed form your wishlist"
    });
}



  showSuccess1() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added successfully to your cart"
    });
}
  showSuccess2() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added successfully to your wishlist"
    });
}

}
