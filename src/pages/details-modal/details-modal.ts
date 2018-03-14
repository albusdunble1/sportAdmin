import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-details-modal',
  templateUrl: 'details-modal.html',
})
export class DetailsModalPage {

  reservationDetails;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {

    this.reservationDetails=this.navParams.data;
  }

  onDismiss(){
    this.viewCtrl.dismiss();
  }

 
}
