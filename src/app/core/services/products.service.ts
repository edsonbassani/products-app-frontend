import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly apiUrl = 'https://localhost:7181/api/Products';

  constructor(private http: HttpClient) {}

  getProducts(searchTerm?: string, sortBy: string = 'Name', sortDescending: boolean = false,
    page: number = 1, pageSize: number = 10): Observable<any> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (searchTerm) {
      params = params.set('searchTerm', searchTerm);
    }

    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }

    params = params.set('sortDescending', sortDescending.toString());

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      shareReplay(1)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, product);
  }

  updateProduct(id: string, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  deactivateProduct(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}`, null);
  }
}
