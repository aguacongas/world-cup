import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    MatCardModule
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
