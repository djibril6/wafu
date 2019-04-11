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
      

    } else {
      this.submitted = true;
    }
  }
}
