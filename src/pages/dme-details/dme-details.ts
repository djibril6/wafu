import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Affiche une partie du DME. par exemple les allergies
 *
 */

import { VarGlobal } from '../../globals/global.var';
import { ApiService } from '../../services/api.service';
import { DmePage } from '../dme/dme';
import { LoginPage } from '../login/login';

@IonicPage({
  name: 'dmeDetails'
})
@Component({
  selector: 'page-dme-details',
  templateUrl: 'dme-details.html',
})
export class DmeDetailsPage {

  name: string;
  title: string; 
  //url: string = this.api.mainUrl + "dme.php";

  constructor(public navCtrl: NavController, public navParams: NavParams, public vg: VarGlobal, public api: ApiService, public modalCtrl: ModalController) {
    if (this.vg.session == 1) {
      this.vg.title = "DME"
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
      this.name = navParams.get('name');
      this.title = navParams.get('title');

      /*var dme = new FormData;
      dme.append('value', this.name);
      dme.append('id', this.vg.user.idPatient);
      var vg = this.vg;
      this.api.ajaxPost(this.url, dme, function(rep){
        if (rep.success) {
          vg.dme = rep.result;
        } else {
          vg.message = rep.message;
        }
      });*/
    } else {
      this.navCtrl.push(LoginPage, {source: 'dme'});
    }
  }

  voirPlus(d) {
    const modal = this.modalCtrl.create('dme-details-plus', {dme: d, titre: this.title});
    modal.present();
  }

}
