import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { CommonProvider } from '../../providers/common';




@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  loading;

  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private common: CommonProvider) {
  }

  onSignIn(form: NgForm){
    this.afAuth.auth.signInWithEmailAndPassword(form.value.matrics+'@test.com', form.value.password)
    .catch(
      (err) => {
        const alert= this.alertCtrl.create({
          title: 'Invalid Details!',
          message: err,
          buttons: ['Ok']
        })
        alert.present();
      }

    );
  }
  

}
