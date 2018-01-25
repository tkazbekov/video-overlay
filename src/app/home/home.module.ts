import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HomeControlsComponent } from './home-controls/home-controls.component';

import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatButtonModule
  ],
  declarations: [HomeComponent, HomeControlsComponent]
})
export class HomeModule { }
