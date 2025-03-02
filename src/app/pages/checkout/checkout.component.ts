import { Component, signal, inject, OnInit } from '@angular/core';
import { Icart } from '../../shared/interfaces/icart';
import { CartService } from '../../core/services/cart/cart.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';



@Component({
  selector: 'app-checkout',
  imports: [NgSelectModule,CommonModule,ReactiveFormsModule,Toast,ButtonModule],
 providers: [MessageService],
standalone: true,
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {


   constructor(private messageService:MessageService) {}




  private readonly cartService = inject(CartService)
  private readonly orderService = inject(OrderService)
  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly router = inject(Router)
  cartId:string=''

  selectedPaymentMethod: string | null = null;



  CartDetails:Icart = {} as Icart

  checkoutForm:FormGroup=new FormGroup({


    details:new FormControl (null,[Validators.required]),

    phone:new FormControl(null,[Validators.required ]),

    city:new FormControl(null,[Validators.required])



  })

  cashPayment():void{


    this.orderService.cashOrder(this.cartId, this.checkoutForm.value).subscribe({

      next: (res) => {
        console.log(res);

        this.router.navigate(['/allorders'])
      },
      error: (err) => {
        console.log(err);
      }

    })



    // setTimeout(() => {
    //   this.router.navigate(['/allorders'])

    // },1500);


  }

  // submitForm(): void {


  //   if (!this.selectedPaymentMethod) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Please select a payment method before proceeding.'
  //     });
  //     return;
  //   }


  //   if(this.selectedPaymentMethod === 'online'){
  //     this.orderService.checkOutSession(this.cartId,this.checkoutForm.value ).subscribe({

  //       next:(res)=>{
  //         console.log(res)

  //         if(res.status === 'success'){

  //           open(res.session.url, '_self')

  //         }
  //       },
  //       error:(err)=>{
  //         console.log(err)
  //       }
  //     })

  //   }else {
  //     this.cashPayment()
  //   }



  //   if (this.checkoutForm.valid) {

  //     const { details, city, phone } = this.checkoutForm.value;


  //     const requestData = { details, city, phone };

  //     console.log(requestData);


  //   }

  //   else{
  //     this.checkoutForm.markAllAsTouched()
  //   }
  // }


  submitForm(): void {

    if (this.checkoutForm.valid && !this.selectedPaymentMethod) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please select a payment method before proceeding.'
      });
      return;
    }


    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }


    if (this.selectedPaymentMethod === 'online') {
      this.orderService.checkOutSession(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.status === 'success') {
            open(res.session.url, '_self');
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      this.cashPayment();
    }
  }


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

  this.activatedRoute.paramMap.subscribe((param)=>{


    this.cartId= param.get('id')!

    console.log( param.get('id'))
  })

 this.getCartData()

}


isModalOpen = signal(false);


countries = signal([
  { code: 'us', name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
  { code: 'gb', name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
  { code: 'fr', name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
  { code: 'de', name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  { code: 'eg', name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  { code: 'sa', name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
  { code: 'it', name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
  { code: 'es', name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
  { code: 'jp', name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
  { code: 'br', name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
  { code: 'in', name: 'India', flag: 'https://flagcdn.com/w40/in.png' }
]);
selectedCountry = signal<string | null>(null);


openModal() {
  this.isModalOpen.set(true);
}


closeModal() {
  this.isModalOpen.set(false);
}

onCountrySelect(code: string | null) {
  this.selectedCountry.set(code);
}

getSelectedCountry() {
  return this.countries().find(c => c.code === this.selectedCountry()) || null;
}

selectedShipping: number = 0;
selectedShippingText: string = 'Free';

updateShipping(price: number, text: string) {
  this.selectedShipping = price;
  this.selectedShippingText = text;
}

}


