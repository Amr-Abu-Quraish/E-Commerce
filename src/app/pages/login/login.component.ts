import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../core/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CarouselModule,ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

   private readonly authService = inject(AuthService)
   private readonly router = inject(Router)
   isLogin:boolean =false
   isSingUp:boolean =false
isForgotPasswordLoading:boolean = false;
   messageError:string | null= null
   messageSuccess:string | null= null

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

  loginForm: FormGroup = new FormGroup({

    email:new FormControl(null,[Validators.required , Validators.email]),
    password :new FormControl(null,  [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)]),

  } )


  submitForm():void{
  if(this.loginForm.valid){

    this.isLogin=true



    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next: (res)=>{

        console.log((res));
        if(res.message === 'success'){

        }
        this.isLogin=false
        setTimeout(() => {


          localStorage.setItem("userToken", res.token)


          this.authService.saveUserToken()


          this.router.navigate(['/home'])
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
    this.loginForm.markAllAsTouched()
  }
  }
  navigateToForgotPassword(): void {
    this.isForgotPasswordLoading = true;
    setTimeout(() => {
      this.router.navigate(['/forgot']);
      this.isForgotPasswordLoading = false;
    },1000);
   }
   navigateToRegister(): void {
    this.isSingUp = true;


    setTimeout(() => {
      this.router.navigate(['/register']);
      this.isSingUp = false;
    },1000);
   }

   @ViewChild('eye') eye!: ElementRef;
   @ViewChild('lock') lock!: ElementRef;
   @ViewChild('passwordInput') passwordInput!: ElementRef;

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


