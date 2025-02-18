import { Component,  ElementRef,  inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Icategory } from '../../shared/interfaces/icategory';
import { RouterLink } from '@angular/router';
import { TabsModule } from 'primeng/tabs';
import { CommonModule } from '@angular/common';
import { FavoriteService } from '../../core/services/favorite/favorite.service';
import { Iimages } from '../../shared/interfaces/iimages';

@Component({
  selector: 'app-categories',
  imports: [TabsModule ,CommonModule ,RouterLink ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {


 constructor(private favoriteService: FavoriteService) {}

  private readonly  productsService = inject(ProductsService)
  private readonly  categoriesService = inject(CategoriesService)

  products:Iproduct[] = []
  categoris:Icategory[] = []



  marketImages:Iimages []= [

    {
      image:'/images/ماركت 1.jpg',
      category:'SuperMarket',
      title: 'Milk',
      price:25,
      quantity:80
    },
    {
      image:'/images/ماركت 2.jpg',
       category:'SuperMarket',
      title: 'Cheese',
      price:20,
      quantity:140
    },
    {
      image:'/images/ماركت 3.jpg',
       category:'SuperMarket',
      title: 'juice',
      price:100,
      quantity:140
    },
    {
      image:'/images/ماركت 4.jpg',
       category:'SuperMarket',
      title: 'Luncheon meat',
      price:120,
      quantity:100
    },
    {
      image:'/images/ماركت 5.webp',
       category:'SuperMarket',
      title: 'minced meat',
      price:120,
      quantity:200
    },
    {
      image:'/images/ماركت 6.jpg',
       category:'SuperMarket',
      title: 'Stripes',
      price:120,
      quantity:200
    },
    {
      image:'/images/ماركت 7.webp',
       category:'SuperMarket',
      title: 'Ice cream',
      price:20,
      quantity:300
    },
    {
      image:'/images/ماركت 8.webp',
       category:'SuperMarket',
      title: 'yogurt',
      price:30,
      quantity:200
    },
    {
      image:'/images/ماركت 9.jpeg',
       category:'SuperMarket',
      title: 'vegetables',
      price:40,
      quantity:150
    },
    {
      image:'/images/ماركت 10.jpeg',
       category:'SuperMarket',
      title: 'vegetables',
      price:50,
      quantity:150
    },

  ]

  homeImages:Iimages []= [

    {
      image:'/images/بيت 1.jpg',
      category:'Home',
      title: 'LG Smart TV',
      price:4000,
      quantity:100
    },
    {
      image:'/images/بيت 2.webp',
       category:'Home',
      title: 'Fresh Refrigerator',
      price:15000,
      quantity:140
    },
    {
      image:'/images/بيت 11.jpg',
       category:'Home',
      title: 'Living rooms',
      price:25000,
      quantity:140
    },
    {
      image:'/images/بيت 3.jpg',
       category:'Home',
      title: 'Toshiba Refrigerator',
      price:30000,
      quantity:140
    },
    {
      image:'/images/بيت 4.webp',
       category:'Home',
      title: 'Living rooms',
      price:12000,
      quantity:100
    },
    {
      image:'/images/بيت 5.png',
       category:'Home',
      title: 'Fresh Air conditioning',
      price:6000,
      quantity:200
    },
    {
      image:'/images/بيت 6.jpeg',
       category:'Home',
      title: 'LG Smart TV',
      price:14000,
      quantity:200
    },
    {
      image:'/images/بيت 7.jpeg',
       category:'Home',
      title: 'Samsung Air conditioning',
      price:10000,
      quantity:300
    },
    {
      image:'/images/بيت 9.jpeg',
       category:'Home',
      title: 'washing machine',
      price:5000,
      quantity:200
    },
    {
      image:'/images/بيت 10.webp',
       category:'Home',
      title: 'washing machine',
      price:9000,
      quantity:150
    },


  ]
  bookImages:Iimages []= [

    {
      image:'/images/كتب 1.webp',
      category:'Books',
      title: 'Davinci Code',
      price:500,
      quantity:100
    },
    {
      image:'/images/كتب 2.webp',
       category:'Books',
      title: 'Hebta',
      price:200,
      quantity:140
    },
    {
      image:'/images/كتب 3.webp',
       category:'Books',
      title: 'Alhasson',
      price:200,
      quantity:140
    },
    {
      image:'/images/كتب 4.jpg',
       category:'Books',
      title: 'THINK AND GROW RICH',
      price:900,
      quantity:140
    },
    {
      image:'/images/كتب 5.webp',
       category:'Books',
      title: 'Rules of life',
      price:600,
      quantity:100
    },

    {
      image:'/images/كتب 8.jpg',
       category:'Books',
      title: 'Make positivity your nature',
      price:500,
      quantity:200
    },
    {
      image:'/images/كتب 7.webp',
       category:'Books',
      title: 'Plesure of Reading',
      price:400,
      quantity:300
    },
    {
      image:'/images/كتب 6.jpg',
       category:'Books',
      title: 'One Hundred Years of Solitude',
      price:800,
      quantity:200
    },

  ]
  mobileImages:Iimages []= [

    {
      image:'/images/موبايل 1.jpeg',
      category:'Mobile',
      title: 'Samsung',
      price:15000,
      quantity:300
    },
    {
      image:'/images/موبايل 2.jpg',
       category:'Mobile',
      title: 'Samsung',
      price:1000,
      quantity:140
    },
    {
      image:'/images/موبايل 3.jpeg',
       category:'Mobile',
      title: 'Oppo',
      price:16000,
      quantity:140
    },
    {
      image:'/images/موبايل 4.jpg',
       category:'Mobile',
      title: 'Oppo',
      price:20000,
      quantity:140
    },
    {
      image:'/images/موبايل 5.webp',
       category:'Mobile',
      title: 'Huawei',
      price:12000,
      quantity:100
    },

    {
      image:'/images/موبايل 6.png',
       category:'Mobile',
      title: 'Huawei',
      price:500,
      quantity:200
    },


  ]


  babytImages:Iimages []= [

    {
      image:'/images/اطفال 1.jpeg',
      category:'Baby & Toy',
      title: 'Pampers',
      price:100,
      quantity:80
    },
    {
      image:'/images/اطفال 2.jpeg',
       category:'Baby & Toy',
      title: 'Molfix',
      price:100,
      quantity:140
    },
    {
      image:'/images/اطفال 3.webp',
       category:'Baby & Toy',
      title: 'Johanson',
      price:100,
      quantity:140
    },
    {
      image:'/images/اطفال 4.jpeg',
       category:'Baby & Toy',
      title: 'Sanosan',
      price:120,
      quantity:100
    },
    {
      image:'/images/اطفال 5.jpg',
       category:'Baby & Toy',
      title: 'Leader Babay',
      price:120,
      quantity:200
    },
    {
      image:'/images/اطفال 6.webp',
       category:'Baby & Toy',
      title: 'Leader Babay',
      price:120,
      quantity:200
    },
    {
      image:'/images/اطفال 7.jpeg',
       category:'Baby & Toy',
      title: ' Leader Babay',
      price:100,
      quantity:300
    },


  ]






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


selectedTab: string = 'Electronic';

updateTabName(tabName: string) {
  this.selectedTab = tabName;
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
