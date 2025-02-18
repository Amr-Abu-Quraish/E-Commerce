import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registere',
  imports: [CarouselModule,ReactiveFormsModule],
  templateUrl: './registere.component.html',
  styleUrl: './registere.component.scss'
})
export class RegistereComponent {

 private readonly authService = inject(AuthService)
 private readonly router = inject(Router)
 isLogin:boolean =false
 isLoged:boolean =false
 messageError:string=''
 messageSuccess:string=''

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false
}

registrationFrom: FormGroup = new FormGroup({
  name:new FormControl(null ,[Validators.required , Validators.minLength(3), Validators.maxLength(20)]),
  email:new FormControl(null,[Validators.required , Validators.email]),
  password :new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),
  rePassword:new FormControl(null,[Validators.required ]),
  phone:new FormControl(null,[Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
}, {validators : this.confirmPassword} )


submitForm():void{
if(this.registrationFrom.valid){

  this.isLogin=true



  this.authService.sendRegisterForm(this.registrationFrom.value).subscribe({
    next: (res)=>{

      console.log((res));
      if(res.message === 'success'){

      }
      this.isLogin=false
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1000);

      this.messageSuccess=res.message

    },
    error: (err:HttpErrorResponse)=>{

      console.log((err));

      this.isLogin=false
      this.messageError= err.error.message

    }
  })
}else{
  this.registrationFrom.markAllAsTouched()
}
}


confirmPassword(group:AbstractControl){

  const password = group.get("password")?.value
  const rePassword = group.get("rePassword")?.value


  return password ===rePassword ? null : {mismatch:true}

}
navigateTologin(): void {
  this.isLoged = true;


  setTimeout(() => {
    this.router.navigate(['/login']);
    this.isLogin = false;
  },1000);
 }


   @ViewChild('eye') eye!: ElementRef;
   @ViewChild('lock') lock!: ElementRef;
   @ViewChild('passwordInput') passwordInput!: ElementRef;

   @ViewChild('reeye') reeye!: ElementRef;
   @ViewChild('relock') relock!: ElementRef;
   @ViewChild('repasswordInput') repasswordInput!: ElementRef;

   togglePassword(): void {
     const input = this.passwordInput.nativeElement;
     const eye = this.eye.nativeElement;
     const lock = this.lock.nativeElement;

     if (input.type === 'password') {
       input.type = 'text';
       eye.classList.replace('fa-eye-slash', 'fa-eye');
       lock.classList.replace('fa-lock', 'fa-lock-open');
     } else {
       input.type = 'password';
       eye.classList.replace('fa-eye', 'fa-eye-slash');
       lock.classList.replace('fa-lock-open', 'fa-lock');
     }
   }
   togglerePassword(): void {
     const input = this.repasswordInput.nativeElement;
     const reeye = this.reeye.nativeElement;
     const relock = this.relock.nativeElement;

     if (input.type === 'password') {
       input.type = 'text';
       reeye.classList.replace('fa-eye-slash', 'fa-eye');
       relock.classList.replace('fa-lock', 'fa-lock-open');
     } else {
       input.type = 'password';
       reeye.classList.replace('fa-eye', 'fa-eye-slash');
       relock.classList.replace('fa-lock-open', 'fa-lock');
     }
   }


   @ViewChild('toastError') toastError!: ElementRef;
   @ViewChild('toastSuccess') toastSuccess!: ElementRef;

   closeToast(type: 'error' | 'success') {
     if (type === 'error' && this.toastError) {
       this.toastError.nativeElement.style.display = 'none';
     }
     if (type === 'success' && this.toastSuccess) {
       this.toastSuccess.nativeElement.style.display = 'none';
     }
   }







}
