import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ProductService {                     //API communication layer
  api = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.api);
  }
  addProducts(formData: FormData) {
    return this.http.post(this.api, formData);
  }
  updateProduct(id: any, formData: FormData) {
    return this.http.put(`${this.api}/${id}`, formData);
  } 
  deleteProduct(id: any) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
