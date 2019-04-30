import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { IonicPage, NavController, Nav, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Page de création de compte utilisateur
 */

import { VarGlobal } from '../../globals/global.var';
import { ApiService } from '../../services/api.service';

import { DmePage } from '../dme/dme';
import { HomePage } from '../home/home';

@IonicPage({
  name: 'inscription'
})
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  @ViewChild(Nav) nav: Nav;

  signup: any = { numCard: '', nom: '', prenom: '', tel: '', tel2: '', email: '', adresse: '', groupeS: '', sexe: '', dateNaiss: '', lieuNaiss: '', taille: '', poids: '', profession: '', num1: '', num2: '', num3: '', num4: '', signe: '' };
  submitted = false;
  source: string;
  url: string = this.api.mainUrl + "connexion.php";

  constructor(public navCtrl: NavController, public navParams: NavParams, public vg: VarGlobal, public api: ApiService, public toast: ToastController, public nativeStorage: NativeStorage, public loadingCtrl: LoadingController) {
    this.source = navParams.get('source');
  }

  inscription(form: NgForm) {
    if (form.valid) {
      var data = new FormData;
      data.append('signup', '');
      data.append('numCard', this.signup.numCard);
      data.append('nom', this.signup.nom);
      data.append('prenom', this.signup.prenom);
      data.append('tel', this.signup.tel);
      data.append('tel2', this.signup.tel2);
      data.append('email', this.signup.email);
      data.append('adresse', this.signup.adresse);
      data.append('groupeS', this.signup.groupeS);
      data.append('sexe', this.signup.sexe);
      data.append('dateNaiss', this.signup.dateNaiss);
      data.append('lieuNaiss', this.signup.lieuNaiss);
      data.append('taille', this.signup.taille);
      data.append('poids', this.signup.poids);
      data.append('profession', this.signup.profession);
      data.append('num1', this.signup.num1);
      data.append('num2', this.signup.num2);
      data.append('num3', this.signup.num3);
      data.append('num4', this.signup.num4);
      data.append('signe', this.signup.signe);
      data.append("player_id", this.vg.player_id);

      var api = this.api;
      var vg = this.vg;
      var toast = this.toast;
      var tel = this.signup.tel;
      var password = this.signup.signe;
      var nativeStorage  = this.nativeStorage;
      var source = this.source;
      const loader = this.loadingCtrl.create({
        content: "Connection...",
        duration: 3000
      });
      loader.present();
      var nav = this.nav;
      api.ajaxPost(this.url, data, function(rep){
        if (rep.success) {
          vg.session = 1;
          vg.user = rep.result;

          nativeStorage.setItem('user', {tel: tel, password: password})
          .then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );

          vg.loggedOutPages = [
            { title: 'Déconnection', component: HomePage, target: 'logout', icon: 'log-out' },
            { title: 'Compte', component: 'compte', icon: 'person' },
            { title: 'Aide', component: 'aide', icon: 'information-circle' },
          ];
          switch (source) { // source contient le nom de la page précédant cette page
            case "dme":
              nav.setRoot(DmePage);
              break;

            case "pharm":
              //nav.setRoot(PharmPage);
              break;
      
            default:
              nav.setRoot(HomePage);
              break;
          }
        } else {
          let test = toast.create({
            message: rep.message,
            duration: 3000
          });
          test.present();
        }
      });
    } else {
      this.submitted = true;
    }
  }

  login() {
    this.navCtrl.push('inscription', {
      source: this.source
    });
  }
}