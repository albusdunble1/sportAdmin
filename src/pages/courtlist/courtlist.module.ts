import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CourtlistPage } from './courtlist';

@NgModule({
  declarations: [
    CourtlistPage,
  ],
  imports: [
    IonicPageModule.forChild(CourtlistPage),
  ],
})
export class CourtlistPageModule {}
