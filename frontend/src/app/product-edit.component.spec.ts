import { TestBed } from '@angular/core/testing';
import { ProductEditComponent } from './product-edit.component';
import { ProductService } from './product.service';
import { of } from 'rxjs';

describe('ProductEditComponent', () => {
  let component: ProductEditComponent;
  let fixture: any;
  let mockSvc: any;

  beforeEach(async () => {
    mockSvc = jasmine.createSpyObj('ProductService', ['create', 'update']);
    await TestBed.configureTestingModule({ imports: [ProductEditComponent], providers: [{ provide: ProductService, useValue: mockSvc }] }).compileComponents();
    fixture = TestBed.createComponent(ProductEditComponent);
    component = fixture.componentInstance;
  });

  it('copies input product on changes', () => {
    component.product = { id: 5, name: 'X', price: 1, quantity: 1 } as any;
    component.ngOnChanges({ product: {} as any });
    expect(component.p.id).toBe(5);
    expect(component.p.name).toBe('X');
  });

  it('calls create when saving new product', () => {
    mockSvc.create.and.returnValue(of({ id: 9, name: 'New', price: 1, quantity: 1 }));
    component.p = { name: 'New', price: 1, quantity: 1 } as any;
    const savedSpy = spyOn(component.saved, 'emit');
    component.save();
    expect(mockSvc.create).toHaveBeenCalled();
    expect(savedSpy).toHaveBeenCalled();
  });

  it('calls update when saving existing product', () => {
    mockSvc.update.and.returnValue(of({ id: 10, name: 'Upd', price: 2, quantity: 2 }));
    component.p = { id: 10, name: 'Upd', price: 2, quantity: 2 } as any;
    const savedSpy = spyOn(component.saved, 'emit');
    component.save();
    expect(mockSvc.update).toHaveBeenCalledWith(10, component.p);
    expect(savedSpy).toHaveBeenCalled();
  });
});
