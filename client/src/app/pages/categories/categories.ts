import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';

interface CategoryData {
  name: string;
  count: number;
  available: number;
  outOfStock: number;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories implements OnInit {
  products: any[] = [];
  loading = true;
  error = '';

  // Statistics
  totalProducts = 0;
  totalAvailable = 0;
  totalOutOfStock = 0;

  // Category data
  categories: CategoryData[] = [];
  categoryList = ['Electronics', 'Clothing', 'Books', 'Food'];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.calculateStatistics();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products';
        this.loading = false;
      }
    });
  }

  calculateStatistics() {
    // Reset counters
    this.totalProducts = this.products.length;
    this.totalAvailable = 0;
    this.totalOutOfStock = 0;

    // Initialize categories
    this.categories = this.categoryList.map(cat => ({
      name: cat,
      count: 0,
      available: 0,
      outOfStock: 0
    }));

    // Calculate statistics
    this.products.forEach(product => {
      // Status counts
      if (product.status === 'Available') {
        this.totalAvailable++;
      } else if (product.status === 'Out-of-Stock') {
        this.totalOutOfStock++;
      }

      // Category counts
      const category = this.categories.find(c => c.name === product.category);
      if (category) {
        category.count++;
        if (product.status === 'Available') {
          category.available++;
        } else {
          category.outOfStock++;
        }
      }
    });
  }

  getCategoryProducts(category: string): any[] {
    return this.products.filter(p => p.category === category);
  }

  getCategoryPercentage(count: number): number {
    if (this.totalProducts === 0) return 0;
    return Math.round((count / this.totalProducts) * 100);
  }
}

