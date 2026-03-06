import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product-service';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product implements OnInit {
  products: any = [];
  product: any = {};

  categories = ['Electronics', 'Fashion', 'Furniture'];
  statusList = ['Avaiable', 'Out of Stock'];

  constructor(
    private http: HttpClient,
    private service: ProductService,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  saveProduct() {
    this.service.addProducts(this.product).subscribe(() => {
      this.product = {};
      this.loadProducts();
    });
  }

  deleteProduct(id: any) {
    this.service.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
