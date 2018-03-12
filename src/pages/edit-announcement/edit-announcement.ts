import { AngularFireDatabase } from 'angularfire2/database';
import { CommonProvider } from './../../providers/common';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';



@IonicPage()
@Component({
  selector: 'page-edit-announcement',
  templateUrl: 'edit-announcement.html',
})
export class EditAnnouncementPage {

  announcementTitle;
  announcementDescription;
  announcementKey;

  aTitle: string;
  aDescrip: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, private common: CommonProvider, private afDB: AngularFireDatabase) {
    this.announcementTitle= this.navParams.get('title');
    this.announcementDescription= this.navParams.get('description');
    this.announcementKey= this.navParams.get('key');
    
    this.aTitle=this.announcementTitle;
    this.aDescrip= this.announcementDescription;
  }

  onEdit(){
    this.afDB.object('/announcements/'+this.announcementKey).update({title: this.aTitle,description:this.aDescrip});
    this.common.toastPop('Edited announcement','bottom').present();
    this.navCtrl.pop();
  }

}
