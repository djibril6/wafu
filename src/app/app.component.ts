import { Component, ViewChild } from '@angular/core';
import { MenuController, Nav, Platform, ToastController, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Autostart } from '@ionic-native/autostart';

import { VarGlobal } from '../globals/global.var';
import { ApiService } from '../services/api.service';

import { HomePage } from '../pages/home/home';
import { DmePage } from '../pages/dme/dme';
import { PharmPage } from '../pages/pharm/pharm';
import { LoginPage } from '../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = 'tuto';

  appPages = [
    { title: 'Accueil', component: HomePage, icon: 'home' },
    { title: 'DME', component: DmePage, icon: 'paper' },
    { title: 'Pharm', component: PharmPage, icon: 'medkit' }
  ];

  loggedOutPages = [
    { title: 'Connection', component: LoginPage, icon: 'log-in' },
    { title: 'Inscription', component: 'inscription', icon: 'person-add' },
    { title: 'Avis', component: 'aide', icon: 'information-circle' },
  ];

  url: string = this.api.mainUrl + "connexion.php";
  url2: string = this.api.mainUrl + "dme.php";

  constructor(platform: Platform, statusBar: StatusBar, public toast: ToastController,splashScreen: SplashScreen, public menu: MenuController, public vg: VarGlobal, public nativeStorage: NativeStorage, public api: ApiService, public screenOrientation: ScreenOrientation, public loadingCtrl: LoadingController, private oneSignal: OneSignal, private backgroundMode: BackgroundMode, private autostart: Autostart) {

    this.vg.loggedOutPages = this.loggedOutPages;
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.autostart.enable();
      //this.autostart.disable();

      this.backgroundMode.enable();

      this.oneSignal.startInit('2aac0a14-a835-4b65-83c3-fea341f4840a', '192591644257');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });

      this.oneSignal.endInit();

      this.oneSignal.getIds().then(
        (val) => {
          this.vg.player_id = val.userId;
        });


    });
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);

    this.nativeStorage.getItem('tuto')
      .then(
        () => {
          this.rootPage = HomePage;
        }
      )

    const loader = this.loadingCtrl.create({
      content: "Chargement...",
      duration: 3000
    });
    

    this.nativeStorage.getItem('user')
      .then(
      r => {
        loader.present();
        var data = new FormData;
          data.append("login", "");
          data.append("tel", r.tel);
          data.append("mdp", r.password);
          var api = this.api;
          var vg = this.vg;    
          api.ajaxPost(this.url, data, function(rep){
          if (rep.success) {
            vg.session = 1;
            vg.user = rep.result;
            vg.loggedOutPages = [
              { title: 'Déconnection', component: HomePage, target: 'logout', icon: 'log-out' },
              { title: 'Compte', component: 'compte', icon: 'person' },
              { title: 'Avis', component: 'aide', icon: 'information-circle' },
            ];
          } else {
            
          }
        });
       },
        error => console.error(error)
      );
  }

  openPage(page) {
    this.menu.close();
    switch (page.component) {
      case DmePage:
        if (this.vg.session == 1) {
          if (page.target && page.target != '') {
            var dme = new FormData;
            dme.append('value', page.name);
            dme.append('id', this.vg.user.idPatient);
            var vg = this.vg;
            var nav = this.nav;
            this.api.ajaxPost(this.url2, dme, function(rep){
              if (rep.success) {
                vg.dme = rep.result;
                vg.message = "-";
                nav.setRoot(page.target, {
                  name: page.name,
                  title: page.title
                });
              } else {
                vg.message = rep.message;
                nav.setRoot(page.target, {
                  name: page.name,
                  title: page.title
                });
              }
            });
          } else {
            this.nav.setRoot(page.component);
          }
        } else {
          this.nav.push(LoginPage, {source: 'dme'});
        }
        break;

      default:
        this.vg.title = "null";
        this.vg.menu = [];
        if(page.target && page.target == 'logout'){
          this.vg.loggedOutPages = this.loggedOutPages;
          this.vg.session = 0;
          this.nativeStorage.remove('user');
          this.nav.setRoot(page.component);
        } else if (page.target && page.target != '') {
          this.nav.setRoot(page.target, {
            name: page.name,
            title: page.title
          });
        } else {
          this.nav.setRoot(page.component);
        }
        break;
    }
  }

  openAnnexe(page: string) {
    this.nav.setRoot(page);
  }
}

