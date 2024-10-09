import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';  // Ensure HttpClient is provided

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideHttpClient()]  // Provide routing and HTTP client globally
}).catch(err => console.error(err));
