import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';



@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule,CarouselModule,StepperModule,FormsModule, ButtonModule,InputOtpModule ],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  private readonly authService = inject(AuthService)
  private readonly router = inject(Router)

  isLogin:boolean =false
     messageError:string=''
   messageSuccess:string=''
   value: string = '';

   step:number = 1




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


    verifyEmail:FormGroup =new FormGroup({

      email:new FormControl(null,[Validators.required,Validators.email])
    })
    verifyCode:FormGroup =new FormGroup({

      resetCode:new FormControl(null,[Validators.required, Validators.pattern(/^[0-9]{6}$/)])
    })


    resetPassword:FormGroup =new FormGroup({

      email:new FormControl(null,[Validators.required, Validators.email]),
      newPassword:new FormControl(null , [Validators.required , Validators.pattern(/^[A-Z]\w{7,}$/)])
    })



    verifyEmailSubmit():void{

    this.isLogin=true

     let emailValue = this.verifyEmail.get('email')?.value

     this.resetPassword.get('email')?.patchValue(emailValue)
      this.authService.setEmailVerify( this.verifyEmail.value).subscribe({

        next:(res)=>{

          console.log(res)

          if(res.statusMsg === 'success'){
            this.step = 2
            this.isLogin=false

          }
        },
        error:(error)=>{

          console.log(error)
          this.isLogin=false

        }
      })
    }


    verifyCodeSubmit():void{

      this.isLogin=true

      this.authService.setCodeVerify( this.verifyCode.value).subscribe({

        next:(res)=>{

          console.log(res)

          if(res.status === 'Success'){
            this.step = 3
            this.isLogin=false

          }
        },
        error:(error)=>{

          console.log(error)
          this.isLogin=false

        }
      })
    }

    resetPasswordSubmit():void{
      this.isLogin=true
      this.authService.setResetPassword( this.resetPassword.value).subscribe({

        next:(res)=>{

          console.log(res)

          localStorage.setItem('userToken', res.token)
           this.authService.saveUserToken()

           this.isLogin=false
         this.router.navigate(['/home'])
        },
        error:(error)=>{

          console.log(error)
          this.isLogin=false

        }
      })
    }

       @ViewChild('eye') eye!:ElementRef;
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

}
