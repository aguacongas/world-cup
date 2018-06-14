import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatSelectModule,
  MatInputModule
} from '@angular/material';

import { TeamRoutingModule } from './team-routing.module';
import { TeamListComponent } from './team-list/team-list.component';
import { AddTeamComponent } from './add-team/add-team.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TeamRoutingModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  declarations: [TeamListComponent, AddTeamComponent]
})
export class TeamModule { }
