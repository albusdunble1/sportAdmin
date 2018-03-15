import { Subscription } from 'rxjs/Subscription';
import { DetailsModalPage } from './../details-modal/details-modal';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-reservation-history',
  templateUrl: 'reservation-history.html',
})
export class ReservationHistoryPage implements OnDestroy{
  
  allReservation= [];
  searchedId: string;
  filteredArray=[];
  reservationSub:Subscription;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private modalCtrl: ModalController) {

    this.reservationSub=this.afDB.list('/reservation').snapshotChanges()
    .map(
      (changes) => {
        return changes.map(
          (data) => ({
            key: data.payload.key,
            ...data.payload.val()
          })
        )
      }
    ).subscribe(
      (reservationStuff) => {
        this.allReservation= reservationStuff;
        this.filteredArray= this.allReservation;
      } 
    )

  }

  onViewDetails(reservation){
    this.modalCtrl.create(DetailsModalPage,reservation).present();
    
  }

  onInput(event){
    if(this.searchedId !== ''){
      // this.filteredArray= this.allReservation.filter(x=> x.reservationID.toString().startsWith(this.searchedId) !== -1);
      this.filteredArray= this.allReservation.filter(x=> 
        x.reservationID.toString().substring(0,this.searchedId.length)=== this.searchedId);
    }else{
      this.filteredArray= this.allReservation;
    }
  
  }

  onCancel(event){

  }


  bodyListener(){

  }

  ngOnDestroy(){
    this.reservationSub.unsubscribe();
  }


}
