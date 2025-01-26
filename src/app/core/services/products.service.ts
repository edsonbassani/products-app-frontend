import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';
import { ApiResponse } from '../../models/api-response.model';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly apiUrl = 'https://localhost:7181/api/Products';

  constructor(private http: HttpClient) {}

  // Get products with type safety
  getProducts(
    searchTerm?: string,
    sortBy = 'Name',
    sortDescending = false,
    page = 1,
    pageSize = 10
  ): Observable<ApiResponse> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', sortBy)
      .set('sortDescending', sortDescending.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    // Ensure the response is strongly typed with `ApiResponse`
    return this.http.get<ApiResponse>(this.apiUrl, { params }).pipe(
      shareReplay(1) // Cache the response to optimize performance
    );
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  // Update an existing product
  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  // Deactivate a product
  deactivateProduct(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}`, null);
  }
}
