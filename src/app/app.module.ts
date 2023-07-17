import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridLayOutComponent } from './grid-lay-out/grid-lay-out.component';
import { ToppingsComponent } from './toppings/toppings.component';

@NgModule({
  declarations: [
    AppComponent,
    GridLayOutComponent,
    ToppingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
