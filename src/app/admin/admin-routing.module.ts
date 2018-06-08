import { AdminComponent } from './admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: 'team', loadChildren: './team/team.module#TeamModule' },
      { path: 'match', loadChildren: './match/match.module#MatchModule' },
      { path: '', redirectTo: 'match', pathMatch: 'full' },
      { path: '**', redirectTo: 'match' }
    ]
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
