import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddMatchComponent } from './add-match/add-match.component';
import { MatchListComponent } from './match-list/match-list.component';

const routes: Routes = [
  { path: '', component: MatchListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
