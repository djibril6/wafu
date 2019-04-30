import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { ApiService } from '../../services/api.service';
import { VarGlobal } from '../../globals/global.var';


@IonicPage({
  name: 'aide'
})
@Component({
  selector: 'page-aide',
  templateUrl: 'aide.html',
})
export class AidePage {

  submitted: boolean = false;
  supportMessage: string;
  url: string = this.api.mainUrl + 'avis.php';

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public api: ApiService, public alertCtrl: AlertController, public vg: VarGlobal) {
    let toast = this.toastCtrl.create({
      message: 'Avez-vous des remarques ou suggestions à nous donner ? Nous adorerions connaître votre avis.',
      position: 'top',
      duration: 5000
    });
    toast.present();
  }

  envoyer(form: NgForm) {
    if (form.valid) {
      this.submitted = false;
      let toasts = this.toastCtrl.create({
        message: 'Message envoyé. Merci beaucoup pour votre contribution.',
        position: 'top',
        duration: 3000
      });
      toasts.present();

      var dataContact = new FormData;
      dataContact.append('avis', '');
      dataContact.append('message', this.supportMessage);
      if (this.vg.session == 1) {
        dataContact.append('id', this.vg.user.idPatient);
      }
      this.api.ajaxPost(this.url, dataContact, function(rep){});
      this.supportMessage = "";
    } else {
      this.submitted = true;
    }
  }

  // Si l'utilisateur saisit un message et tente de quitter la page 
  // Sans avoir envoyer le dit message
  ionViewCanLeave(): boolean | Promise<boolean> {
    // Si le message est vide il peut quitter sans problème
    if (!this.supportMessage || this.supportMessage.trim().length === 0) {
      return true;
    }

    return new Promise((resolve: any, reject: any) => {
      let alert = this.alertCtrl.create({
        title: 'Quitter la page page?',
        message: 'Êtes vous sûr de vouloir quitter cette page ? Votre message ne sera pas envoyé.'
      });
      alert.addButton({ text: 'Rester', handler: reject });
      alert.addButton({ text: 'Quitter', role: 'cancel', handler: resolve });

      alert.present();
    });
  }

}
