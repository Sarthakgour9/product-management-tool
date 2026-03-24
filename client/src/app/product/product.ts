import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  products: any[] = [];
  product: any = {};
  editingId: string | null = null;
  loading: boolean = false;
  error: string = '';

  categories = [
    'Electronics',
    'Clothing',
    'Books',
    'Food',
    'Furniture',
    'Home & Garden',
    'Sports & Outdoors',
    'Toys & Games',
    'Beauty & Personal Care',
    'Automotive',
    'Health & Wellness',
    'Office Supplies',
    'Pet Supplies'
  ];
  statusList = ['Available', 'Out-of-Stock'];

  constructor(
    private http: HttpClient,
    private service: ProductService,
    private cdr: ChangeDetectorRef
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
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load products';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  saveOrUpdateProduct() {
    if (this.editingId) {
      // Update
      this.service.updateProduct(this.editingId, this.product).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error updating product:', err);
          this.error = 'Failed to update product.';
          this.cdr.detectChanges();
        },
      });
    } else {
      // Add new
      this.service.addProducts(this.product).subscribe({
        next: () => {
          this.resetForm();
          this.loadProducts();
        },
        error: (err) => {
          console.error('Error saving product:', err);
          this.error = 'Failed to save product.';
          this.cdr.detectChanges();
        },
      });
    }
  }

  editProduct(id: string) {
    const prod = this.products.find((p: any) => p.id === parseInt(id));
    if (prod) {
      this.product = { ...prod };
      this.editingId = id;
    }
  }

  cancelEdit() {
    this.resetForm();
  }

  private resetForm() {
    this.product = {};
    this.editingId = null;
  }

  deleteProduct(id: any) {
    this.service.deleteProduct(id).subscribe({
      next: () => {
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        this.error = 'Failed to delete product.';
        this.cdr.detectChanges();
      },
    });
  }

  // Helper methods for stats
  getAvailableCount(): number {
    return this.products.filter((p: any) => p.status === 'Available').length;
  }

  getOutOfStockCount(): number {
    return this.products.filter((p: any) => p.status === 'Out-of-Stock').length;
  }

  getUniqueCategories(): number {
    const categories = new Set(this.products.map((p: any) => p.category));
    return categories.size;
  }
}
