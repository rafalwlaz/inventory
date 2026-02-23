// Product edit component
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss'
})
export class ProductEditComponent implements OnChanges {
  @Input() product!: Product | null;
  @Output() saved = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  p: Product = { name: '', description: '', location: '', price: 0, quantity: 0 };

  constructor(private svc: ProductService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.p = { ...this.product } as Product;
    }
  }

  save() {
    if (!this.p.id) {
      this.svc.create(this.p).subscribe((r) => this.saved.emit(r));
    } else {
      this.svc.update(this.p.id, this.p).subscribe((r) => this.saved.emit(r));
    }
  }
}
