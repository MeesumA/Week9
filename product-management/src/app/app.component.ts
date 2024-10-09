import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // Mark this as a standalone component
  imports: [RouterModule]  // Import RouterModule to enable routing
})
export class AppComponent {
  title = 'product-management';
}
