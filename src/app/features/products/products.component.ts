import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  newProduct = { name: '', price: 0, active: true };
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService
      .getProducts(this.searchTerm, 'Name', false, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          this.products = data.data.products;
          this.totalItems = data.data.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        },
        error: (err) => {
          console.error('Error fetching products:', err);
        }
      });
  }

  addProduct() {
    this.productsService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', price: 0, active: true };
      },
      error: (err) => {
        console.error('Error adding product:', err);
      }
    });
  }

  deactivateProduct(id: string) {
    this.productsService.deactivateProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => {
        console.error('Error deleting product:', err);
      }
    });
  }

  changePage(newPage: number) {
    if (newPage > 0 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.loadProducts();
    }
  }

  searchProducts() {
    this.currentPage = 1; // Reset to the first page for new search
    this.loadProducts();
  }
}
