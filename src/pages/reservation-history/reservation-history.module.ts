import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationHistoryPage } from './reservation-history';

@NgModule({
  declarations: [
    ReservationHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationHistoryPage),
  ],
})
export class ReservationHistoryPageModule {}
