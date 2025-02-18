import { Component, ElementRef, inject, OnInit,  QueryList, Input, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';

import { Iproduct } from '../../shared/interfaces/iproduct';
import { FavoriteService } from '../../core/services/favorite/favorite.service';



@Component({
  selector: 'app-details',
  imports: [],

  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {

  constructor(private favoriteService: FavoriteService) {}


  private readonly activatedRoute = inject(ActivatedRoute)
  private readonly productsService = inject(ProductsService)


  detailsProduct:Iproduct | null =null
  selectedImage: string | null = null;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe({
      next:(p)=>{
        let productId =(p.get('id'))


        this.productsService.getSpecificProducts(productId).subscribe({

          next:(res)=>{
            console.log(res.data)

            this.detailsProduct =res.data


          },
          error:(err)=>{
            console.log(err)
          }



        })

      }
    })
  }



  isFavorite(product: Iproduct): boolean {
    return this.favoriteService.isFavorite(product._id);
  }


  public product = [
    { price: 699, ratingsAverage: 2.7 },
    { price: 549, ratingsAverage: 3 },
    { price: 349, ratingsAverage: 3 },
    { price: 549, ratingsAverage: 5 },
  ];

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  getHasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }


  changeMainImage(imgSrc: string): void {
    this.selectedImage = imgSrc;
  }
  @ViewChildren('heartIcon') heartIcons!: QueryList<ElementRef>;

  toggleHeart(event: Event): void {

    const heartElement = this.heartIcons.find(
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


  selectedColor: string = 'Red';

changeColor(color: string): void {
  this.selectedColor = color;
}
  selectedSize: string = 'Small';

changeSize(size: string): void {
  this.selectedSize = size;
}

@Input() rating = 4.7;
@Input() totalReviews = 578;
@Input() reviews = [
  { stars: 5, count: 488 },
  { stars: 4, count: 74 },
  { stars: 3, count: 14 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];



getPercentage(count: number): number {
  return (count / this.totalReviews) * 100;
}






}
