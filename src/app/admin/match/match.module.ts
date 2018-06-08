import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from '@angular/material';

import { MatchRoutingModule } from './match-routing.module';
import { PipeModule } from './../../pipe/pipe.module';

import { MatchListComponent } from './match-list/match-list.component';
import { AddMatchComponent } from './add-match/add-match.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatchRoutingModule,
    MatButtonModule,
    MatSelectModule,
    MatGridListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    PipeModule
  ],
  declarations: [MatchListComponent, AddMatchComponent]
})
export class MatchModule { }
