import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage({
  name: 'tuto'
})
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public menu: MenuController,  public platform: Platform) {
    this.dir = platform.dir();
      this.slides = [
        {
          title: "Vos informations médicales à porté de main",
          description: "Suivez votre état de santé à travers votre dossier médical électronique",
          image: 'assets/imgs/tuto2.jpg',
        },
        {
          title: "Votre dossier médical est partagé en toute confidentialité",
          description: "Vous seul contrôlez ceux qui peuvent y accéder",
          image: 'assets/imgs/tuto1.jpg',
        },
        {
          title: "Restez alertés lors d'une épidémie",
          description: "Vous pourrez ainsi recevoir des conseils sur le comportement à adopter",
          image: 'assets/imgs/tuto3.jpg',
        }
      ];
  }

  startApp() {
    this.navCtrl.setRoot(HomePage, {}, {
      animate: true,
      direction: 'forward'
    });
  }

  onSlideChangeStart(slider) {
    this.showSkip = !slider.isEnd();
  }

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
