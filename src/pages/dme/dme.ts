import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';

/**
 * Partie Dossier Médical Electronique
 *
 */

import { PopoverPage } from '../about-popover/about-popover';
import { LoginPage } from '../login/login';

import { VarGlobal } from '../../globals/global.var';

@Component({
  selector: 'page-dme',
  templateUrl: 'dme.html',
})
export class DmePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public vg: VarGlobal, public popoverCtrl: PopoverController) {
    if (this.vg.session == 1) {
      this.vg.title = "DME";
      this.vg.menu = [
        {title: 'Profil', name: '', component: DmePage, target: '', icon: 'man'},
        {title: 'Allergies', name: 'allergies', component: DmePage, target: 'dmeDetails', icon: 'ionitron'}, 
        {title: 'Antécédants', name: 'antecedents', component: DmePage, target: 'dmeDetails', icon: 'pulse'},
        {title: 'Maladies', name: 'maladies', component: DmePage, target: 'dmeDetails', icon: 'thermometer'},
        {title: 'Traitements en cours', name: 'traitements', component: DmePage, target: 'dmeDetails', icon: 'body'},
        {title: 'Consultations', name: 'consultations', component: DmePage, target: 'dmeDetails', icon: 'eye'},
        {title: 'Analyses', name: 'analyses', component: DmePage, target: 'dmeDetails', icon: 'flask'},
        {title: 'Hospitalisations', name: 'hospitalisations', component: DmePage, target: 'dmeDetails', icon: 'medical'}
      ];
    } else {
      this.navCtrl.push(LoginPage, {source: 'dme'});
    }
  }

  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }
  

}
