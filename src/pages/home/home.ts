import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

import { VarGlobal } from '../../globals/global.var';
import { ApiService } from '../../services/api.service';

import { DmePage } from '../dme/dme';
import { PharmPage } from '../pharm/pharm';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  url: string = this.api.mainUrl + "news.php";

  constructor(public navCtrl: NavController, public vg: VarGlobal, public nativeStorage: NativeStorage, public api: ApiService) {
    this.nativeStorage.setItem('tuto', {});
    var news = new FormData;
    news.append('news', '');
    api.ajaxPost(this.url, news, function(rep){
      if (rep.success) {
        vg.epi = rep.result[0];
        vg.news = rep.result[1];
      }
    });
  }

  lirePlus() {
    this.navCtrl.push('homeDetails');
  }

  naviguerVers(page: string) {
    switch (page) {
      case 'DmePage':
        if (this.vg.session == 1) {
          this.navCtrl.setRoot(DmePage);
        } else {
          this.navCtrl.push(LoginPage, {source: 'dme'});
        }
        break;

      case 'PharmPage':
        this.navCtrl.setRoot(PharmPage);
        break;
    
      default:
        break;
    }
  }
}
