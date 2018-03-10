import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
  }

  onSubmit(f: NgForm){
    this.afDB.list('/announcements').push({description:f.value.announcement});
  }

}
