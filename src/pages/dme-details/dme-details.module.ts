import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DmeDetailsPage } from './dme-details';

@NgModule({
  declarations: [
    DmeDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DmeDetailsPage),
  ],
})
export class DmeDetailsPageModule {}
