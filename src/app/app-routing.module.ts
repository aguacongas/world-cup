import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminGuardService } from './admin-guard.service';

const routes: Routes = [
  {
    path: 'world-cup',
    component: HomeComponent
  },
  {
    path: 'world-cup/rank',
    loadChildren: './ranking/ranking.module#RankingModule',
  },
  {
    path: 'world-cup/about',
    loadChildren: './about/about.module#AboutModule',
  },
  {
    path: 'world-cup/admin',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [AdminGuardService]
  },
  { path: '', redirectTo: 'world-cup', pathMatch: 'full' },
  { path: '**', redirectTo: 'world-cup' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
