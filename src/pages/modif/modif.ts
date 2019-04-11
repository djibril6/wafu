import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/service.api';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-modif',
  templateUrl: 'modif.html'
})
export class ModifPage {
  use: any = { nom: '', prenom: '', tel: '', email: '', password: '' };
  submitted = false;
  item: any;

  constructor(public navCtrl: NavController, public api: ApiService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public navParam: NavParams) {
    this.item = navParam.get('item');
   }

  modif(form: NgForm) {
    if (form.valid) {
    var api = this.api;
    var data2 = new FormData;
    var navCtrl = this.navCtrl;
    var toast = this.toastCtrl;
    data2.append("mode", "modif");
    data2.append("id", this.item.id);
    data2.append("nom", this.use.nom);
    data2.append("prenom", this.use.prenom);
    data2.append("tel", this.use.tel);
    data2.append("email", this.use.email);
    data2.append("oldmdp", this.item.password);
    data2.append("newmdp", this.use.password);
    const loader = this.loadingCtrl.create({
      content: "Un instant...",
      duration: 3000
    });
    loader.present();
    api.ajaxPost(api.mainUrl, data2, function(rep){
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
  } else {
    this.submitted = true;
  }
}

} 
