import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';

import { ApiService } from '../../services/service.api';

import { LoginPage } from '../login/login';
import { ModifPage } from '../modif/modif';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  

  constructor(public navCtrl: NavController, public api: ApiService, public toastCtrl: ToastController, public loadingCtrl: LoadingController,) {
    
  }
  del(item) {
    var api = this.api;
    var data = new FormData;
    var navCtrl = this.navCtrl;
    var toast = this.toastCtrl;
    data.append("mode", "del");
    data.append("id", item.id);
    data.append("compte", item.compte);
    const loader = this.loadingCtrl.create({
      content: "Un instant...",
      duration: 3000
    });
    loader.present();
    api.ajaxPost(api.mainUrl, data, function(rep){
      if (rep.success) {
        navCtrl.setRoot(LoginPage);
      } else {
        let test = toast.create({
          message: rep.message,
          duration: 3000,
          position: 'top'
        });
        test.present();
      }
    });
  }

  modif(item) {
    this.navCtrl.push(ModifPage, {item:item})
  }
}
