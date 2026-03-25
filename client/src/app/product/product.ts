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
  filteredProducts: any[] = [];
  product: any = {};
  searchTerm: string = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;
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

  onSearch() {
    this.filterProducts();
  }

  loadProducts() {
    this.loading = true;

    this.service.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.filteredProducts = [...res];
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
    if (!this.isFormValid()) {
      this.error = 'Please fill all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name || '');
    formData.append('price', this.product.price?.toString() || '');
    formData.append('category', this.product.category || '');
    formData.append('status', this.product.status || '');
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    if (this.editingId) {
      this.service.updateProduct(this.editingId, formData).subscribe({
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
      this.service.addProducts(formData).subscribe({
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

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  private resetForm() {
    this.product = {};
    this.selectedImage = null;
    this.imagePreview = null;
    this.editingId = null;
  }

  editProduct(id: string) {
    const prod = this.products.find((p: any) => p.id === parseInt(id));
    if (prod) {
      this.product = { ...prod };
      this.editingId = id;
      // Note: Image edit requires re-upload (no file preview from URL)
    }
  }

  cancelEdit() {
    this.resetForm();
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

  filterProducts() {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [...this.products];
      return;
    }
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter((p: any) => 
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    );
  }

  isFormValid(): boolean {
    return !!(
      this.product.name &&
      this.product.price &&
      this.product.category &&
      this.product.status
    );
  }

  trackById(index: number, item: any): any {
    return item.id;
  }

  // Helper methods for stats
  getAvailableCount(): number {
    return this.filteredProducts.filter((p: any) => p.status === 'Available').length;
  }

  getOutOfStockCount(): number {
    return this.filteredProducts.filter((p: any) => p.status === 'Out-of-Stock').length;
  }

  getUniqueCategories(): number {
    const categories = new Set(this.filteredProducts.map((p: any) => p.category));
    return categories.size;
  }
}

