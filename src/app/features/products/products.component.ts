import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = []; // Use the Product interface
  newProduct: Partial<Product> = { name: '', price: 0, active: true }; // Initialize as Partial<Product>
  searchTerm = '';
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  totalPages = 0;
  errorMessage = '';

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService
      .getProducts(this.searchTerm, 'Name', false, this.currentPage, this.pageSize)
      .subscribe({
        next: (data) => {
          const productData = data?.data || { products: [], totalItems: 0 };
          this.products = productData.products;
          this.totalItems = productData.totalItems;
          this.totalPages = Math.ceil(this.totalItems / this.pageSize);
          this.errorMessage = ''; // Clear error messages on success
        },
        error: (err) => {
          console.error('Error fetching products:', err);
          this.errorMessage = 'Failed to load products. Please try again later.';
        },
      });
  }

  addProduct() {
    if (!this.newProduct.name || (this.newProduct.price && this.newProduct.price <= 0)) {
      this.errorMessage = 'Product name and price are required.';
      return;
    }
  
    this.productsService.addProduct(this.newProduct as Product).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', price: 0, active: true };
        this.errorMessage = ''; // Clear errors on success
      },
      error: (err) => {
        console.error('Error adding product:', err);
        this.errorMessage = 'Failed to add product. Please try again later.';
      },
    });
  }

  deactivateProduct(id: string) {
    // Deactivate a product
    this.productsService.deactivateProduct(id).subscribe({
      next: () => this.loadProducts(), // Reload products after deactivating
      error: (err) => {
        console.error('Error deactivating product:', err);
        this.errorMessage = 'Failed to deactivate product. Please try again later.';
      },
    });
  }

  changePage(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) {
      return; // Prevent invalid page changes
    }
    this.currentPage = newPage;
    this.loadProducts();
  }

  searchProducts() {
    this.currentPage = 1; // Reset to the first page for new search
    this.loadProducts();
  }
}
