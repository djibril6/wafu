import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DmeDetailsPlusPage } from './dme-details-plus';

@NgModule({
  declarations: [
    DmeDetailsPlusPage,
  ],
  imports: [
    IonicPageModule.forChild(DmeDetailsPlusPage),
  ],
})
export class DmeDetailsPlusPageModule {}
