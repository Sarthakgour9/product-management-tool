import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: any[] = [];
  loading = true;
  error = '';

  // Statistics
  totalProducts = 0;
  totalCategories = 0;
  availableProducts = 0;
  outOfStockProducts = 0;

  // Recent products (last 5)
  recentProducts: any[] = [];

  // Categories with counts
  categoryStats: { name: string; count: number; icon: string }[] = [];

  constructor(
    private productService: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.productService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data;
        this.calculateStatistics();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load data';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  calculateStatistics() {
    this.totalProducts = this.products.length;
    
    // Calculate available vs out of stock
    this.availableProducts = this.products.filter(p => p.status === 'Available').length;
    this.outOfStockProducts = this.products.filter(p => p.status === 'Out-of-Stock').length;

    // Calculate unique categories
    const categories = new Set(this.products.map(p => p.category));
    this.totalCategories = categories.size;

    // Get recent products (last 5)
    this.recentProducts = [...this.products].slice(-5).reverse();

    // Category statistics
    const categoryMap = new Map<string, number>();
    this.products.forEach(p => {
      categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1);
    });

    const categoryIcons: { [key: string]: string } = {
      'Electronics': '💻',
      'Clothing': '👕',
      'Books': '📚',
      'Food': '🍔'
    };

    this.categoryStats = Array.from(categoryMap.entries())
      .map(([name, count]) => ({
        name,
        count,
        icon: categoryIcons[name] || '📦'
      }))
      .sort((a, b) => b.count - a.count);
  }
}
