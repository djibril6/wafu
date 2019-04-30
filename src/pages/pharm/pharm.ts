import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Partie pharmacie
 *
 */

import { VarGlobal } from '../../globals/global.var';

@Component({
  selector: 'page-pharm',
  templateUrl: 'pharm.html',
})
export class PharmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public vg: VarGlobal) {
    this.vg.title = "Pharmacie"
    this.vg.menu = [
      {title: 'Pharm1', component: 'dmeDetails', icon: 'home'}, 
      {title: 'Pharm2', component: 'dmeDetails', icon: 'home'}
    ];
  }

  ionViewDidLoad() {
    
  }

}
