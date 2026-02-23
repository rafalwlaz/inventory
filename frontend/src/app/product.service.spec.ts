import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from './product.model';

describe('ProductService', () => {
  let service: ProductService;
  let http: HttpTestingController;
  const base = 'http://localhost:3000/api/products';

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ProductService] });
    service = TestBed.inject(ProductService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('should list products', () => {
    const mock: Product[] = [{ id: 1, name: 'A', price: 1, quantity: 1 }];
    service.list().subscribe((r) => expect(r).toEqual(mock));
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should get product', () => {
    const mock: Product = { id: 2, name: 'B', price: 2, quantity: 2 };
    service.get(2).subscribe((r) => expect(r).toEqual(mock));
    const req = http.expectOne(`${base}/2`);
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });

  it('should create product', () => {
    const payload: Product = { name: 'C', price: 3, quantity: 3 };
    const resp: Product = { id: 3, ...payload };
    service.create(payload).subscribe((r) => expect(r).toEqual(resp));
    const req = http.expectOne(base);
    expect(req.request.method).toBe('POST');
    req.flush(resp);
  });

  it('should update product', () => {
    const payload: Partial<Product> = { name: 'C2' };
    const resp: Product = { id: 3, name: 'C2', price: 3, quantity: 3 } as Product;
    service.update(3, payload).subscribe((r) => expect(r).toEqual(resp));
    const req = http.expectOne(`${base}/3`);
    expect(req.request.method).toBe('PUT');
    req.flush(resp);
  });

  it('should delete product', () => {
    service.delete(4).subscribe((r) => expect(r).toBeTruthy());
    const req = http.expectOne(`${base}/4`);
    expect(req.request.method).toBe('DELETE');
    req.flush({}, { status: 204, statusText: 'No Content' });
  });
});
