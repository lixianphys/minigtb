import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { ExampleComponent } from './components/example/example.component';
@NgModule({
    declarations: [
        AppComponent,
        ExampleComponent,
        BrowserModule,
    ],
})
export class AppModule { }