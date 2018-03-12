import { EditAnnouncementPage } from './../pages/edit-announcement/edit-announcement';
import { AnnouncementPage } from './../pages/announcement/announcement';
import { CourtDatePage } from './../pages/courtdate/courtdate';
import { CommonProvider } from './../providers/common';
import { SigninPage } from './../pages/signin/signin';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CourtlistPage } from '../pages/courtlist/courtlist';

export const firebaseConfig = {
  apiKey: "AIzaSyAqEwyw1GntJd1F3yVftTlDCUQdRKlXGfQ",
  authDomain: "angularfire-dummy.firebaseapp.com",
  databaseURL: "https://angularfire-dummy.firebaseio.com",
  projectId: "angularfire-dummy",
  storageBucket: "",
  messagingSenderId: "164158484108"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SigninPage,
    CourtDatePage,
    CourtlistPage,
    AnnouncementPage,
    EditAnnouncementPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SigninPage,
    CourtDatePage,
    CourtlistPage,
    AnnouncementPage,
    EditAnnouncementPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CommonProvider
  ]
})
export class AppModule {}
