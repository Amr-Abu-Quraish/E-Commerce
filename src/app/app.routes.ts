import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { logedGuard } from './core/guards/loged.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/registere/registere.component').then(
            (m) => m.RegistereComponent
          ),
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./pages/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
        title: 'Forgot Password',
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'wishlist',
        loadComponent: () =>
          import('./pages/wishlist/wishlist.component').then((m) => m.WishlistComponent),
        title: 'wishlist',
      },


      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
        title: 'Products',
      },
      {
        path: 'about-us',
        loadComponent: () =>
          import('./pages/about/about.component').then(
            (m) => m.AboutComponent
          ),
        title: 'about-us',
      },
      {
        path: 'countact-us',
        loadComponent: () =>
          import('./pages/contact/contact.component').then(
            (m) => m.ContactComponent
          ),
        title: 'contact-us',
      },
      {
        path: 'blogs',
        loadComponent: () =>
          import('./pages/blogs/blogs.component').then(
            (m) => m.BlogsComponent
          ),
        title: 'blogs',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
        title: 'Categories',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then(
            (m) => m.AllordersComponent
          ),
        title: 'allorders',
      },

      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
        title: 'Checkout',
      },
      {
        path:"details/:id",loadComponent:()=> import('./pages/details/details.component').then(
          (m)=>m.DetailsComponent,

        ),


        title:'Details'
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then(
            (m) => m.NotfoundComponent
          ),
      },
    ],
  },
];
