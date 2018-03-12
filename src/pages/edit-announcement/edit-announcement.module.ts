import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditAnnouncementPage } from './edit-announcement';

@NgModule({
  declarations: [
    EditAnnouncementPage,
  ],
  imports: [
    IonicPageModule.forChild(EditAnnouncementPage),
  ],
})
export class EditAnnouncementPageModule {}
