import { AnnouncementPage } from './../pages/announcement/announcement';
import { CourtDatePage } from './../pages/courtdate/courtdate';
import { CommonProvider } from './../providers/common';
import { SigninPage } from './../pages/signin/signin';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../pages/home/home';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;



  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,private afAuth: AngularFireAuth, private common: CommonProvider) {
    this.afAuth.authState.subscribe(
      (user) => {
      if(user){
        this.nav.setRoot(HomePage);
        this.common.setUser(user.uid,user.email);
      }else{
        this.nav.setRoot(SigninPage);
      }
      
      }
    )

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Reservation Requests', component: HomePage },
      { title: 'View Courts', component: CourtDatePage },
      { title: 'Post Announcement', component: AnnouncementPage }  
      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  onLogout(){
    this.afAuth.auth.signOut();
    this.nav.setRoot(SigninPage);
  }
}
