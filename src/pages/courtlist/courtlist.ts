import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';


@IonicPage()
@Component({
  selector: 'page-courtlist',
  templateUrl: 'courtlist.html',
})
export class CourtlistPage implements OnDestroy{

  courtType: string;


  isBadminton=false;
  isSquash=false;
  isTakraw=false;
  isBasketball=false;
  isFootball=false;

  courtName:string;

  dateTime= {
    date:'',
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

  takrawRef$;
  takrawObservable;
  takraw2Sync=[];

  basketballRef$;
  basketballObservable;
  basketball2Sync=[];

  footballRef$;
  footballObservable;
  football2Sync=[];



  badmintonStatusUpdateRef$;
  squashStatusUpdateRef$;
  fee: number;

  badmintonRecentStatus=false;
  squashRecentStatus=false;
  takrawRecentStatus=false;
  basketballRecentStatus=false;
  footballRecentStatus=false;

  reservationTimeSub: Subscription;
  badmintonSub: Subscription;
  squashSub: Subscription;
  takrawSub: Subscription;
  basketballSub: Subscription;
  footballSub: Subscription;
  

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
        
          // this.reservationAfterChecking.subscribe(
          //   (data) => {
          //     this.RCArray= data;
              
          //   }
          // )

    this.reservationTimeSub=this.reservationAfterChecking.subscribe(
            (data) => {
              this.RCArray= data;
              console.log(this.RCArray);
              this.RCArray.forEach(
                (check)=> {
                  console.log(check.key);
                  this.categoryKey=check.key;

                  // problemmm (solved for now ) ( retreived the category on that date, now think about how to sync everything)
                  this.badmintonRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/0/courts');
                  this.badmintonObservable= this.badmintonRef$.valueChanges();

                  this.badmintonSub=this.badmintonObservable.subscribe(
                    (badmintonStuff) => {
                      
                      this.badminton2Sync= badmintonStuff;
                     
                    }
                  )

                  this.squashRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/3/courts');
                  this.squashObservable= this.squashRef$.valueChanges();
                  
                  this.squashSub=this.squashObservable.subscribe(
                    (squashStuff) => {
                      this.squash2Sync= squashStuff;
                      

                    }
                  )

                  this.takrawRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/4/courts');
                  this.takrawObservable= this.takrawRef$.valueChanges();
                  
                  this.takrawSub=this.takrawObservable.subscribe(
                    (takrawStuff) => {
                      this.takraw2Sync= takrawStuff;
                      console.log(this.takraw2Sync);
                    }
                  )

                  this.basketballRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/1/courts');
                  this.basketballObservable= this.basketballRef$.valueChanges();
                  
                  this.basketballSub=this.basketballObservable.subscribe(
                    (basketballStuff) => {
                      this.basketball2Sync= basketballStuff;
                    }
                  )

                  this.footballRef$=this.afDB.list('/reservationTimes/'+ this.dateTime.time + '/'+ this.dateTime.date+'/'+ this.categoryKey+ '/category/2/courts');
                  this.footballObservable= this.footballRef$.valueChanges();
                  
                  this.footballSub=this.footballObservable.subscribe(
                    (footballStuff) => {
                      this.football2Sync= footballStuff;
                    }
                  )

                  
                }
              )
            }
          )



 
  }



  onChange(event){
    // console.log(this.RCArray);
    if(event === 'badminton'){
      this.isBadminton=true;
      this.isSquash=false;
      this.isTakraw=false;
      this.isBasketball=false;
      this.isFootball=false;
      this.squashRecentStatus= false;
      this.takrawRecentStatus= false;
      this.basketballRecentStatus= false;
      this.footballRecentStatus= false;
    }else if(event ==='squash'){
      this.isBadminton=false;
      this.isSquash=true;
      this.isTakraw=false;
      this.isBasketball=false;
      this.isFootball=false;
      this.badmintonRecentStatus= false;
      this.takrawRecentStatus= false;
      this.basketballRecentStatus= false;
      this.footballRecentStatus= false;
    }else if(event ==='takraw'){
      this.isBadminton=false;
      this.isSquash=false;
      this.isTakraw=true;
      this.isBasketball=false;
      this.isFootball=false;
      this.badmintonRecentStatus= false;
      this.squashRecentStatus= false;
      this.basketballRecentStatus= false;
      this.footballRecentStatus= false;
    }else if(event ==='basketball'){
      this.isBadminton=false;
      this.isSquash=false;
      this.isTakraw=false;
      this.isBasketball=true;
      this.isFootball=false;
      this.badmintonRecentStatus= false;
      this.takrawRecentStatus= false;
      this.squashRecentStatus= false;
      this.footballRecentStatus= false;
    }else if(event ==='football'){
      this.isBadminton=false;
      this.isSquash=false;
      this.isTakraw=false;
      this.isBasketball=false;
      this.isFootball=true;
      this.badmintonRecentStatus= false;
      this.takrawRecentStatus= false;
      this.basketballRecentStatus= false;
      this.squashRecentStatus= false;
    }
    else{
      this.isBadminton=false;
      this.isSquash=false;
      this.isTakraw=false;
      this.isBasketball= false;
      this.isFootball= false;
      this.badmintonRecentStatus= false;
      this.squashRecentStatus=false;
      this.takrawRecentStatus= false;
      this.basketballRecentStatus= false;
      this.footballRecentStatus= false;
    }
  }


  ngOnDestroy(){
    this.badmintonSub.unsubscribe();
    this.squashSub.unsubscribe();
    this.reservationTimeSub.unsubscribe();
    this.takrawSub.unsubscribe();
    this.basketballSub.unsubscribe();
    this.footballSub.unsubscribe();
  }

}
