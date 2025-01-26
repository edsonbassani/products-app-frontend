import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductsComponent } from './products.component';
import { ProductsService } from '../../core/services/products.service';

describe('ProductsComponent', () => {
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProductsComponent, // Import standalone component
        HttpClientTestingModule // Import HttpClientTestingModule
      ],
      providers: [
        ProductsService // Add ProductsService as a provider
      ]
    }).compileComponents();

    httpController = TestBed.inject(HttpTestingController);
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(ProductsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    httpController.verify(); // Verify that all expected HTTP requests were made
  });
});