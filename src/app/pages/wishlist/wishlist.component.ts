import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';

import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-wishlist',
  imports: [Toast,ButtonModule,SweetAlert2Module],
  providers: [MessageService],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

   constructor(
              private messageService:MessageService
   ) {}
 countWishList:Signal<number>= computed(()=>this.wishlistService.wishListNumber())
 private readonly wishlistService = inject(WishlistService)
  private readonly  cartService = inject(CartService)

 isAddLoading:{[key:string]:boolean}={}

 wishListDetails: Iwishlist[] = [];


 getWishListData():void{
  this.wishlistService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      console.log(res)

      this.wishListDetails= res.data
      console.log(this.wishListDetails)

    },
    error:(err)=>{
      console.log(err)
    }
  })
 }

  ngOnInit(): void {
    this.getWishListData()

  }





  addToCart(id: string): void {
    this.isAddLoading[id] = true;

    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);

        this.cartService.cartNumber.set(res.numOfCartItems);
        console.log(this.cartService.cartNumber());

        // حذف العنصر من ال wishlist بعد إضافته للسلة
        this.wishListDetails = this.wishListDetails.filter(item => item._id !== id);
        this.wishlistService.wishListNumber.set(this.wishListDetails.length);

        // تحديث LocalStorage بعد الحذف
        localStorage.setItem('wishlist', JSON.stringify(this.wishListDetails.map(p => p._id)));

        setTimeout(() => {
          this.isAddLoading[id] = false;
          this.showSuccess();
        }, 1500);
      },
      error: (err) => {
        console.log(err);
        this.isAddLoading[id] = false;
      }
    });
  }


  //  removeItem(id:string):void{

  //     const swalWithBootstrapButtons = Swal.mixin({
  //       customClass: {
  //         confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
  //         cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  //       },
  //       buttonsStyling: false
  //     });
  //     swalWithBootstrapButtons.fire({
  //       title: "Are you sure?",
  //       text: "Are you sure that you want to delete this item ?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonText: "Yes, delete it     !",
  //       cancelButtonText: "No, cancel     !",

  //     reverseButtons: true

  //     }).then((result) => {
  //       if (result.isConfirmed) {

  //      this.wishlistService.removeItemFromWishList(id).subscribe({

  //       next:(res)=>{
  //         console.log(res)

  //         this.getWishListData()
  //         this.wishlistService.wishListNumber.set(res.data.length)





  //  swalWithBootstrapButtons.fire({
  //   title: "Deleted!",
  //   text: "Your item has been deleted.",
  //   icon: "success"
  // });

  //       },
  //       error:(err)=>{
  //         console.log(err)
  //       }
  //      })


  //       } else if (

  //         result.dismiss === Swal.DismissReason.cancel
  //       ) {
  //         swalWithBootstrapButtons.fire({
  //           title: "Cancelled",
  //           text: "Your item is safe. ",
  //           icon: "error"
  //         });
  //       }
  //     });

  //   }

  removeItem(id: string): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
        cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.wishlistService.removeItemFromWishList(id).subscribe({
          next: (res) => {
            console.log(res);

            // تحديث القائمة بعد الحذف
            this.wishListDetails = this.wishListDetails.filter(product => product._id !== id);
            this.wishlistService.wishListNumber.set(this.wishListDetails.length);
            localStorage.setItem('wishlist', JSON.stringify(this.wishListDetails.map(p => p._id))); // تحديث LocalStorage

            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success"
            });
          },
          error: (err) => {
            console.log(err);
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe.",
          icon: "error"
        });
      }
    });
  }


    // clearAllWishList(): void {
    //   const swalWithBootstrapButtons = Swal.mixin({
    //     customClass: {
    //       confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
    //       cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    //     },
    //     buttonsStyling: false
    //   });

    //   swalWithBootstrapButtons.fire({
    //     title: "Are you sure?",
    //     text: "Are you sure that you want to delete all items?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonText: "Yes, delete all!",
    //     cancelButtonText: "No, cancel!",
    //     reverseButtons: true
    //   }).then((result) => {
    //     if (result.isConfirmed) {

    //       const deleteRequests = this.wishListDetails.map(product =>
    //         this.wishlistService.removeItemFromWishList(product._id).toPromise()
    //       );

    //       Promise.all(deleteRequests)
    //         .then(() => {
    //           this.wishListDetails = [];
    //           this.wishlistService.wishListNumber.set(0);

    //           swalWithBootstrapButtons.fire({
    //             title: "Deleted!",
    //             text: "All items have been deleted.",
    //             icon: "success"
    //           });
    //         })
    //         .catch(err => {
    //           console.log(err);
    //           swalWithBootstrapButtons.fire({
    //             title: "Error",
    //             text: "Failed to delete some items.",
    //             icon: "error"
    //           });
    //         });
    //     } else if (result.dismiss === Swal.DismissReason.cancel) {
    //       swalWithBootstrapButtons.fire({
    //         title: "Cancelled",
    //         text: "Your items are safe.",
    //         icon: "error"
    //       });
    //     }
    //   });
    // }

    clearAllWishList(): void {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
          cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "Are you sure that you want to delete all items?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete all!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteRequests = this.wishListDetails.map(product =>
            this.wishlistService.removeItemFromWishList(product._id).toPromise()
          );

          Promise.all(deleteRequests)
            .then(() => {
              this.wishListDetails = [];
              this.wishlistService.wishListNumber.set(0);
              localStorage.removeItem('wishlist'); // مسح LocalStorage عند حذف كل العناصر

              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "All items have been deleted.",
                icon: "success"
              });
            })
            .catch(err => {
              console.log(err);
              swalWithBootstrapButtons.fire({
                title: "Error",
                text: "Failed to delete some items.",
                icon: "error"
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your items are safe.",
            icon: "error"
          });
        }
      });
    }



  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: "Product added successfully to your cart"
    });
}





  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getHasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }


}
