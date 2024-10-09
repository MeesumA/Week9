import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,  // Declare as standalone
  imports: [FormsModule]  // Import FormsModule for form handling
})
export class AddProductComponent {
  product = { name: '', description: '', price: 0, units: 0 };

  constructor(private productService: ProductService, private router: Router) {}

  // Add a new product
  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(() => {
      this.router.navigate(['/products']);  // Navigate back to product list
    });
  }
}
