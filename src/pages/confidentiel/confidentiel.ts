import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Page où l'on choisit qui peut avoir accès au DME.
 *
 */

@IonicPage({
  name: 'confidentiel'
})
@Component({
  selector: 'page-confidentiel',
  templateUrl: 'confidentiel.html',
})
export class ConfidentielPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfidentielPage');
  }

}
