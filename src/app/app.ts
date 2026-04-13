import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styles: [`
    .nav-link.active { background: rgba(255, 255, 255, 0.2); }
  `],
})
export class AppComponent {
  year = new Date().getFullYear();
}
