import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Page où s'affiche les détails des actualités
 * Peut aussi s'afficher en cas d'épidémie
 */

@IonicPage({
  name: 'homeDetails'
})
@Component({
  selector: 'page-home-details',
  templateUrl: 'home-details.html',
})
export class HomeDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
