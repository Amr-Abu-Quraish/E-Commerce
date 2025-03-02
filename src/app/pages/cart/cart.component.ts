import { Component, computed, inject,   OnInit, Signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Icart } from '../../shared/interfaces/icart';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';




@Component({
  selector: 'app-cart',
  imports: [SweetAlert2Module ,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {

  private readonly cartService = inject(CartService)


  countCart:Signal<number> = computed(()=> this.cartService.cartNumber()) 
  CartDetails:Icart = {} as Icart
  isloadingPlus: { [key: string]: boolean } = {};
  isloadingMinus: { [key: string]: boolean } = {};



  getCartData():void{
    this.cartService.getLoggedUserCart().subscribe({
      next:(res)=>{

        this.CartDetails=res.data

        console.log(this.CartDetails)


       

      
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  ngOnInit():void{
   this.getCartData()
  }


  removeItem(id:string):void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
        cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this item ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it     !",
      cancelButtonText: "No, cancel     !",

    reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {

     this.cartService.removeSpecificCarItem(id).subscribe({

      next:(res)=>{
        console.log(res)

 this.CartDetails=res.data
 this.cartService.cartNumber.set(res.numOfCartItems)

 

 swalWithBootstrapButtons.fire({
  title: "Deleted!",
  text: "Your item has been deleted.",
  icon: "success"
});

      },
      error:(err)=>{
        console.log(err)
      }
     })


      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your item is safe. ",
          icon: "error"
        });
      }
    });

  }


  clearAllItems():void{

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-600 hover:bg-green-700 text-white ms-3 border-transparent font-bold py-2 px-4 rounded",
        cancelButton: "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "Are you sure that you want to delete All items ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it    !",
      cancelButtonText: "No, cancel     !",

    reverseButtons: true

    }).then((result) => {
      if (result.isConfirmed) {

     this.cartService.clearUserCart().subscribe({

      next:(res)=>{
        console.log(res)

          if(res.message==='success'){
            this.CartDetails= {} as Icart
            this.cartService.cartNumber.set(0)
          }

 swalWithBootstrapButtons.fire({
  title: "Deleted!",
  text: "Your items have been deleted.",
  icon: "success"
});

      },
      error:(err)=>{
        console.log(err)
      }
     })


      } else if (

        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your items are safe.",
          icon: "error"
        });
      }
    });


 }


  updateProductCount(id:string , count:number, action: 'plus' | 'minus'):void{

    if (count < 1 || this.isloadingPlus[id] || this.isloadingMinus[id]) return;

  if (action === 'plus') {
    this.isloadingPlus[id] = true;
  } else {
    this.isloadingMinus[id] = true;
  }


    this.cartService.updateCartCountity(id , count).subscribe({

      next:(res)=>{
        console.log(res)


 this.CartDetails=res.data
      },
      error:(err)=>{
        console.log(err)

      },
      complete: () => {

        if (action === 'plus') {
          this.isloadingPlus[id] = false;
        } else {
          this.isloadingMinus[id] = false;
        }
      }
     })

  }




}

