import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Product } from './product/product';
import { AddProduct } from './pages/add-product/add-product';
import { Categories } from './pages/categories/categories';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'products',
    component: Product,
  },
  {
    path: 'about',
    component: About,
  },
  {
    path: 'add-product',
    component: AddProduct,
  },
  {
    path: 'categories',
    component: Categories,
  },
];
