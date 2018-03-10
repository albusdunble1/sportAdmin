import { HomePage } from './../home/home';
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
  myDate= new Date().toISOString().substring(0,10);
  announcements;
  announcementsArray=[];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {

    this.announcements = afDB.list('/announcements').snapshotChanges()
    .map(
      (changes) => {
        return changes.map(
          (data) => ({
            key: data.payload.key,
            ...data.payload.val()
          })
        )
      }
    );

    //extracting all the data from the observable and putting it in local array to be used
    this.announcements.subscribe(
      (data) => {
        this.announcementsArray = data;
      }
    )
  }

  onSubmit(f: NgForm){
    this.afDB.list('/announcements').push({title: f.value.title,description:f.value.description, date: this.myDate});
    f.reset();
  }

  onSwipe(key: string){
    this.afDB.object('/announcements/'+ key).remove();
  }

}
