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
  loading: boolean = false;
  error: string = '';

  categories = ['Electronics', 'Fashion', 'Furniture'];
  statusList = ['Available', 'Out of Stock'];

  constructor(
    private http: HttpClient,
    private service: ProductService,
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;

    this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  saveProduct() {
    this.service.addProducts(this.product).subscribe({
      next: () => {
        this.product = {};
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error saving product:', err);
        this.error = 'Failed to save product.';
      },
    });
  }

  deleteProduct(id: any) {
    this.service.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.error = 'Failed to delete product.';
      },
    });
  }
}
