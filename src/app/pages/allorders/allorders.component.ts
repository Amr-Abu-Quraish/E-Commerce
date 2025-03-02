import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { OrderService } from '../../core/services/order/order.service';
import { Iorder } from '../../shared/interfaces/iorder';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit {
 private readonly authService = inject(AuthService)
 private readonly orderService = inject(OrderService)

 userId: string = '';


 userOrderDetaisl:Iorder[] = []


 getUserOrder(id:string):void{
  this.orderService.getUserOrder(id).subscribe({


    next:(res)=>{
      console.log(res)

      this.userOrderDetaisl = res

      console.log('det', this.userOrderDetaisl)
    }

  })
 }

 ngOnInit(): void {
  this.authService.saveUserToken();

  const userData = this.authService.getUserData();
  if (userData && userData.id) {
    this.userId = userData.id;
    console.log('User ID:', this.userId);



    this.getUserOrder(this.userId);
  }
}




}
