import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  standalone: true,  // Declare as standalone
  imports: [CommonModule, RouterModule]  // Import necessary modules
})
export class ProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // Fetch products from the backend
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  // Delete a product
  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product._id !== id);
    });
  }
}
