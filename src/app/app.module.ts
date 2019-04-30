import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NativeStorage } from '@ionic-native/native-storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { OneSignal } from '@ionic-native/onesignal';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Autostart } from '@ionic-native/autostart';

import { VarGlobal } from '../globals/global.var';
import { ApiService } from '../services/api.service';

import { PopoverPage } from '../pages/about-popover/about-popover';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DmePage } from '../pages/dme/dme';
import { PharmPage } from '../pages/pharm/pharm';
import { LoginPage } from '../pages/login/login';


@NgModule({
  declarations: [
    MyApp,
    PopoverPage,
    HomePage,
    DmePage,
    PharmPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PopoverPage,
    DmePage,
    PharmPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    VarGlobal,
    ApiService,
    NativeStorage,
    OneSignal,
    ScreenOrientation,
    BackgroundMode,
    Autostart,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
