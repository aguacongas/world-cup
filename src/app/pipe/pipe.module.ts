import { TimePipe } from './time.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipeService } from './time-pipe.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [TimePipeService],
  declarations: [TimePipe],
  exports: [TimePipe]
})
export class PipeModule { }
