import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/service.api'

import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // Page de connection
  login: any = { tel: '', password: '' };
  submitted = false;
  url: string = this.api.mainUrl;


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController, public api: ApiService) {
  }

  // Attempt to login in through our User service
  connection(form: NgForm) {
    if (form.valid) {
      var api = this.api;
      var data = new FormData;
      var navCtrl = this.navCtrl;
      var toast = this.toastCtrl;
      data.append("mode", "login");
      data.append("tel", this.login.tel);
      data.append("mdp", this.login.password);
      const loader = this.loadingCtrl.create({
        content: "Vérification...",
        duration: 3000
      });
      loader.present();
      api.ajaxPost(this.url, data, function(rep){
        if (rep.success) {
          api.user = rep.result;
          navCtrl.setRoot(HomePage);
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
