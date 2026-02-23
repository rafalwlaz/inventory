import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { ProductEditComponent } from './product-edit.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatTableModule, MatButtonModule, MatIconModule, ProductEditComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  editing: Product | null = null;
  displayedColumns: string[] = ['id', 'name', 'location', 'price', 'quantity', 'actions'];
  constructor(private svc: ProductService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.list().subscribe((s) => (this.products = s));
  }

  edit(p: Product) {
    this.editing = { ...p };
  }

  remove(id: number) {
    if (!confirm('Delete product?')) return;
    this.svc.delete(id).subscribe(() => this.load());
  }

  createSample() {
    const sample: Product = { name: 'New item', location: 'Main Stock', price: 0, quantity: 0 };
    this.svc.create(sample).subscribe(() => this.load());
  }

  onSaved(_: Product) {
    this.editing = null;
    this.load();
  }
}
