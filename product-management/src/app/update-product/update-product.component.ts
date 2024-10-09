import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css'],
  standalone: true,  // Declare as standalone
  imports: [FormsModule]  // Import FormsModule for form handling
})
export class UpdateProductComponent implements OnInit {
  product = { name: '', description: '', price: 0, units: 0 };
  id: string;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.route.snapshot.paramMap.get('id')!;  // Capture the ID from the route
  }

  ngOnInit(): void {
    // Fetch product by ID
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
    });
  }

  // Update the product
  updateProduct(): void {
    this.productService.updateProduct(this.id, this.product).subscribe(() => {
      this.router.navigate(['/products']);  // Navigate back to product list
    });
  }
}
