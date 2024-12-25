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

    <router-outlet></router-outlet>
      `,
  styles: [
    `
      main {
        padding: 16px;
      }
      header {
        background-color: blue;
        padding: 16px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'hello';
}
