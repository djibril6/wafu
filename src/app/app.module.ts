import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { ApiService } from '../services/service.api';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ModifPage } from '../pages/modif/modif';
import { MyApp } from './app.component';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModifPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModifPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ApiService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
