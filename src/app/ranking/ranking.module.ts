import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RankingRoutingModule } from './ranking-routing.module';
import { MatCardModule,
  MatGridListModule,
  MatListModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule} from '@angular/material';

import { RankingComponent } from './ranking/ranking.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RankingRoutingModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [RankingComponent]
})
export class RankingModule { }
