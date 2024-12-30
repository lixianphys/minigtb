import { Component, signal } from '@angular/core';
import { GreetingComponent } from '../components/greeting/greeting.component';
import { TriggerbuttonComponent } from '../components/triggerbutton/triggerbutton.component';
@Component({
  selector: 'app-home',
  imports: [GreetingComponent, TriggerbuttonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  homeMessage = signal('Welcome to our recipe recommendation system!');

}
