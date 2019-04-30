import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage({
  name: 'dme-details-plus'
})
@Component({
  selector: 'page-dme-details-plus',
  templateUrl: 'dme-details-plus.html',
})
export class DmeDetailsPlusPage {

  dme: any;
  titre: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.dme = this.navParams.get('dme');
    this.titre = this.navParams.get('titre');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
