import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink,Toast,CommonModule],

providers: [MessageService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {


 constructor(
  private messageService:MessageService
) {}


    private readonly  productsService = inject(ProductsService)
      private readonly  cartService = inject(CartService)
       private readonly  wishlistService = inject(WishlistService)
    products:Iproduct[] = []


  isAddLoading:{[key:string]:boolean}={}
  isInWishlist(id: string): boolean {
    let storedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    return storedWishlist.includes(id);
  }

  currentPage = 1;
  pageSize = 8;


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




   ngOnInit(): void {
    this.getProductsData()

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


  showSuccess1() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added successfully to your cart"
    });
}

showSuccess2() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added successfully to your wishlist"
  });
}
showSuccess3() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product removed form your wishlist"
  });
}

  get paginatedProducts() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.products.slice(startIndex, endIndex);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.pageSize);
  }

  getPages() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


  getFullStars(rating: number) {
    return Array(Math.floor(rating)).fill(0);
  }

  getHasHalfStar(rating: number) {
    return rating % 1 !== 0;
  }

}
