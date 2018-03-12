import { EditAnnouncementPage } from './../edit-announcement/edit-announcement';
import { Subscription } from 'rxjs/Subscription';
import { HomePage } from './../home/home';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { CommonProvider } from '../../providers/common';



@IonicPage()
@Component({
  selector: 'page-announcement',
  templateUrl: 'announcement.html',
})
export class AnnouncementPage implements OnDestroy{
  myDate= new Date().toISOString().substring(0,10);
  announcements;
  announcementsArray=[];

  announcementSub: Subscription;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private common: CommonProvider) {

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
    this.announcementSub=this.announcements.subscribe(
      (data) => {
        this.announcementsArray = data;
      }
    )
  }

  onSubmit(f: NgForm){
    this.afDB.list('/announcements').push({title: f.value.title,description:f.value.description, date: this.myDate});
    f.reset();
    this.common.toastPop('Posted announcement','bottom').present();
  }

  onRemoveAnnouncement(key: string){
    this.afDB.object('/announcements/'+ key).remove();
    this.common.toastPop('Removed announcement','bottom').present();
  }

  onEditAnnouncement(announcement){
    this.navCtrl.push(EditAnnouncementPage,announcement);
  }

  ngOnDestroy(){
    this.announcementSub.unsubscribe();
  }

}
