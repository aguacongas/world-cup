import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule,
  MatCardModule,
  MatTabsModule
} from '@angular/material';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
