import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-courtlist',
  templateUrl: 'courtlist.html',
})
export class CourtlistPage {

  courtType: string;
 
  isBadminton=false;
  isSquash=false;
  courtName:string;
 
  dateTime={
    date: '',
    time:''
  }
  reservationTimeRef$;
  reservationAfterChecking;
  RCArray= [];
  categoryKey:string;
  badmintonRef$;
  badmintonObservable;
  badminton2Sync=[];
  squashRef$;
  squashObservable;
  squash2Sync=[];
  badmintonStatusUpdateRef$;
  squashStatusUpdateRef$;
  fee: number;
  badmintonRecentStatus=false;
  squashRecentStatus=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
    this.dateTime= this.navParams.get('dateTime');
    console.log(this.dateTime);



    //retreving the reservation with the submitted date and time
    this.reservationTimeRef$= this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date);

    this.reservationAfterChecking = this.reservationTimeRef$.snapshotChanges()
    .map(
      (changes) => {
        return changes.map(
          (data) => ({
            key: data.payload.key,
            ...data.payload.val()
          })
        )
      }
    )
        


          this.reservationAfterChecking.subscribe(
            (data) => {
              this.RCArray= data;
              console.log(this.RCArray);
              this.RCArray.forEach(
                (check)=> {
                  console.log(check.key);
                  this.categoryKey=check.key;

                  this.badmintonRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/0/courts');
                  this.badmintonObservable= this.badmintonRef$.valueChanges();

                  this.badmintonObservable.subscribe(
                    (badmintonStuff) => {
                      
                      this.badminton2Sync= badmintonStuff;
                     
                    }
                  )

                  this.squashRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/1/courts');
                  this.squashObservable= this.squashRef$.valueChanges();
                  
                  this.squashObservable.subscribe(
                    (squashStuff) => {
                      this.squash2Sync= squashStuff;
                    }
                  )
                }
              )
            }
          )



 
  }

  onChange(event){
    if(event === 'badminton'){
      this.isBadminton=true;
      this.isSquash=false;
    }else{
      this.isBadminton=false;
      this.isSquash=true;
    }
  }

  
}
