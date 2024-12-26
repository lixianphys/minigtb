import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent],
  template: `
    <header>
      <app-header></app-header>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>

      `,
  styles: [
    `
      main {
        padding: 16px;
      }
      header {
        padding: 16px;
        background-color: #f0f0f0;
      }
    `,
  ],
})
export class AppComponent {}
