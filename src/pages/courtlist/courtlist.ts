import { CommonProvider } from './../../providers/common';
import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';
import { Reservation } from '../../models/reservation.model';


@IonicPage()
@Component({
  selector: 'page-courtlist',
  templateUrl: 'courtlist.html',
})
export class CourtlistPage implements OnDestroy{

  courtType: string;
  reservationFinal: Reservation;

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
  adminID;
  adminEmail;
  adminSub: Subscription;
  adminObject;
  

  constructor(private common:CommonProvider,public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase) {
    this.dateTime= this.navParams.get('dateTime');
    console.log(this.dateTime);


    //get admin uid
    this.adminID=this.common.getUser();
    this.adminEmail= this.common.getUserEmail();
    console.log(this.adminID);
    let content = {
      email: this.adminEmail
    }
    this.afDB.object('/admins/'+ this.adminID).update(content);

    this.adminSub=this.afDB.object('/admins/'+ this.adminID).valueChanges()
  .subscribe(
    (adminName) => {
      this.adminObject= adminName;
      console.log(this.adminObject.name);
    }
  )


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

  onSelect(){
    console.log(this.courtType);
    console.log(this.courtName);
    if(this.badmintonRecentStatus === true){
      this.fee= 5;
    }else if(this.squashRecentStatus === true){
      this.fee=3;
    }else if(this.takrawRecentStatus === true){
      this.fee=4;
    }else if(this.basketballRecentStatus === true){
      this.fee=7;
    }else if(this.footballRecentStatus === true){
      this.fee=10;
    }
    // const reservationRef= this.afDB.list('reservation');
    // reservationRef.push(this.reservationFinal);
    // this.navCtrl.push(ReserveDetailsPage,{courtType: this.courtType, courtName: this.courtName, dateTime: this.dateTime, fee: this.fee, approvedStatus: false, reservationKey: this.categoryKey, userName: this.userObject.name});
    let randomID= Math.floor(Math.random() * 10000000000);
    this.reservationFinal=new Reservation(this.dateTime.date, this.dateTime.time, this.courtType, this.courtName, this.fee,true, true,'Admin',this.categoryKey,randomID, this.adminObject.name);
    const reservationRefForPush$= this.afDB.list('reservation');
    reservationRefForPush$.push(this.reservationFinal);

    
  }


  onSelectCourt(courtName:string, bookedStatus){
    this.courtName=courtName;
    
    if(bookedStatus==true){
      this.badmintonRecentStatus= false;
      this.squashRecentStatus= false;
      this.takrawRecentStatus= false;
      this.basketballRecentStatus= false;
      this.footballRecentStatus= false;

      // console.log('badminton: ',this.badmintonRecentStatus);
      //   console.log('squash:',this.squashRecentStatus);
    }else{
      // console.log(this.courtName);
      // console.log(this.courtType);
      if(this.courtType=== 'badminton'){
        this.badmintonRecentStatus= true;
        if(this.squashRecentStatus == true){
          this.squashRecentStatus= false;
        }else if(this.takrawRecentStatus == true){
          this.takrawRecentStatus= false;
        }else if(this.basketballRecentStatus == true){
          this.basketballRecentStatus= false;
        }else if(this.footballRecentStatus == true){
          this.footballRecentStatus= false;
        }
        // console.log('badminton: ',this.badmintonRecentStatus);
        // console.log('squash:',this.squashRecentStatus);
      }else if(this.courtType === 'squash'){
        this.squashRecentStatus= true;
        if(this.badmintonRecentStatus == true){
          this.badmintonRecentStatus= false;
        }else if(this.takrawRecentStatus == true){
          this.takrawRecentStatus= false;
        }else if(this.basketballRecentStatus == true){
          this.basketballRecentStatus= false;
        }else if(this.footballRecentStatus == true){
          this.footballRecentStatus= false;
        }


      }else if(this.courtType === 'takraw'){
        this.takrawRecentStatus= true;
        if(this.badmintonRecentStatus == true){
          this.badmintonRecentStatus= false;
        }else if(this.squashRecentStatus == true){
          this.squashRecentStatus= false;
        }else if(this.basketballRecentStatus == true){
          this.basketballRecentStatus= false;
        }else if(this.footballRecentStatus == true){
          this.footballRecentStatus= false;
        }
      }
      
      
      else if(this.courtType === 'basketball'){
        this.basketballRecentStatus= true;
        if(this.badmintonRecentStatus == true){
          this.badmintonRecentStatus= false;
        }else if(this.takrawRecentStatus == true){
          this.takrawRecentStatus= false;
        }else if(this.squashRecentStatus == true){
          this.squashRecentStatus= false;
        }else if(this.footballRecentStatus == true){
          this.footballRecentStatus= false;
        }
      }
      
      
      else if(this.courtType === 'football'){
        this.footballRecentStatus= true;
        if(this.badmintonRecentStatus == true){
          this.badmintonRecentStatus= false;
        }else if(this.takrawRecentStatus == true){
          this.takrawRecentStatus= false;
        }else if(this.basketballRecentStatus == true){
          this.basketballRecentStatus= false;
        }else if(this.squashRecentStatus == true){
          this.squashRecentStatus= false;
        }
      }
    }
    

    
  }


  ngOnDestroy(){
    this.badmintonSub.unsubscribe();
    this.squashSub.unsubscribe();
    this.reservationTimeSub.unsubscribe();
    this.takrawSub.unsubscribe();
    this.basketballSub.unsubscribe();
    this.footballSub.unsubscribe();
    this.adminSub.unsubscribe();
  }

}
