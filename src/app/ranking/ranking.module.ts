import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingRoutingModule } from './ranking-routing.module';
import { MatCardModule, MatGridListModule, MatListModule } from '@angular/material';

import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  imports: [
    CommonModule,
    RankingRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatListModule
  ],
  declarations: [RankingComponent]
})
export class RankingModule { }
