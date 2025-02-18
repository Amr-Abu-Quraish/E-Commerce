import { Component,  ElementRef,  inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FavoriteService } from '../../core/services/favorite/favorite.service';




@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,CommonModule, TabsModule, RouterLink],

templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

 constructor(private favoriteService: FavoriteService) {}



 private readonly  productsService = inject(ProductsService)
 private readonly  categoriesService = inject(CategoriesService)
 products:Iproduct[] = []
 categoris:Icategory[] = []


 customOptions: OwlOptions = {
  loop: true,

  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:true,
  autoplayTimeout:2500,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items:8
    }
  },
  nav: false
}



lastOptions: OwlOptions = {
  loop: true,
margin:15,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: false,
  autoplay:false,
  autoplayTimeout:2500,
  autoplayHoverPause:true,
  navSpeed: 700,
  navText: ['<i class="fa-solid fa-chevron-left"></i>', '<i class="fa-solid fa-chevron-right"></i>'],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items:5
    }
  },
  nav: true
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





// public product = [
//   { price: 699, ratingsAverage: 2.7 },
//   { price: 549, ratingsAverage: 3 },
//   { price: 349, ratingsAverage: 3 },
//   { price: 549, ratingsAverage: 5 },
// ];

getFullStars(rating: number): number[] {
  return Array(Math.floor(rating)).fill(0);
}

getHasHalfStar(rating: number): boolean {
  return rating % 1 !== 0;
}


  toggleHeart(product: Iproduct) {
    this.favoriteService.toggleFavorite(product._id);
  }

  isFavorite(product: Iproduct): boolean {
    return this.favoriteService.isFavorite(product._id);
  }

  @ViewChildren('heartIcon1') heartIcons1!: QueryList<ElementRef>;

  toggleHeart2(event: Event): void {

    const heartElement = this.heartIcons1.find(
      (el) => el.nativeElement === event?.target
    );

    if (heartElement) {
      const heartClassList = heartElement.nativeElement.classList;

      if (heartClassList.contains('fa-regular')) {
        heartClassList.replace('fa-regular', 'fa-solid');
      } else {
        heartClassList.replace('fa-solid', 'fa-regular');
      }
    }
  }

}
