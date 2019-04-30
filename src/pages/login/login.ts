import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

/**
 * Page de login
 */

import { NativeStorage } from '@ionic-native/native-storage';

import { VarGlobal } from '../../globals/global.var';
import { ApiService } from '../../services/api.service';

import { DmePage } from '../dme/dme';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  source: string;
  login: any = { tel: '', password: '' };
  submitted = false;
  url: string = "connexion.php";

  constructor(public navCtrl: NavController, public navParams: NavParams, public toast: ToastController, public vg: VarGlobal, public api: ApiService, public nativeStorage: NativeStorage, public loadingCtrl: LoadingController) {
    this.source = navParams.get('source');
    if (this.source == "dme") {
      let test = this.toast.create({
        message: 'Identifiez-vous pour accéder à votre dossier médical',
        duration: 3000
      });
      test.present();
    }
    this.url = api.mainUrl + this.url;
  }

  connection(form: NgForm) {
    if (form.valid) {
      var data = new FormData;
      data.append("login", "");
      data.append("tel", this.login.tel);
      data.append("mdp", this.login.password);
      data.append("player_id", this.vg.player_id);
      var api = this.api;
      var vg = this.vg;
      var source = this.source; 
      var navCtrl = this.navCtrl;
      var toast = this.toast;
      var tel = this.login.tel;
      var password = this.login.password;
      var nativeStorage  = this.nativeStorage;
      const loader = this.loadingCtrl.create({
        content: "Vérification...",
        duration: 3000
      });
      loader.present();
      api.ajaxPost(this.url, data, function(rep){
        if (rep.success) {
          vg.session = 1;
          vg.user = rep.result;
          vg.loggedOutPages = [
            { title: 'Déconnection', component: HomePage, target: 'logout', icon: 'log-out' },
            { title: 'Compte', component: 'compte', icon: 'person' },
            { title: 'Aide', component: 'aide', icon: 'information-circle' },
          ];

          nativeStorage.setItem('user', {tel: tel, password: password})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );

          switch (source) {
            case "dme":
          
              navCtrl.setRoot(DmePage);
              break;

            case "pharm":
              //this.navCtrl.setRoot(PharmPage);
              break;
      
            default:
              navCtrl.setRoot(HomePage);
              break;
          }
        } else {
          let test = toast.create({
            message: 'Votre téléphone ou mot de passe est incorrect',
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

  inscription() {
    this.navCtrl.push('inscription', {
      source: this.source
    });
  }

}
