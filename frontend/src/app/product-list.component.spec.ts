import { TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { Product } from './product.model';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: any;
  let mockSvc: any;

  beforeEach(async () => {
    mockSvc = jasmine.createSpyObj('ProductService', ['list', 'delete', 'create']);
    mockSvc.list.and.returnValue(of([{ id: 1, name: 'A', price: 1, quantity: 1 }]));
    await TestBed.configureTestingModule({ imports: [ProductListComponent], providers: [{ provide: ProductService, useValue: mockSvc }] }).compileComponents();
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('loads products on init', () => {
    component.ngOnInit();
    expect(mockSvc.list).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
  });

  it('deletes product and reloads', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    mockSvc.delete.and.returnValue(of({}));
    mockSvc.list.calls.reset();
    component.remove(1);
    expect(mockSvc.delete).toHaveBeenCalledWith(1);
  });
});
