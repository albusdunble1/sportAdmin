import { DetailsModalPage } from './../details-modal/details-modal';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-reservation-history',
  templateUrl: 'reservation-history.html',
})
export class ReservationHistoryPage {
  
  allReservation= [];
  searchedId: string;
  filteredArray=[];
  searchClicked= false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private afDB: AngularFireDatabase, private modalCtrl: ModalController) {

    this.afDB.list('/reservation').snapshotChanges()
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
        console.log(reservationStuff);
        this.allReservation= reservationStuff;
        this.filteredArray= this.allReservation;
      } 
    )

  }

  onViewDetails(reservation){
    this.modalCtrl.create(DetailsModalPage,reservation).present().then(
      ()=> {
        this.filteredArray= this.allReservation;
    this.searchedId='';
      }
    );
    
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
    this.searchClicked=false;
    this.filteredArray= this.allReservation;
    this.searchedId='';
  }

  toggleSearch(){
    this.searchClicked= !this.searchClicked;
    this.filteredArray= this.allReservation;
    this.searchedId='';
  }

  bodyListener(){
    this.searchClicked=false;
    this.filteredArray= this.allReservation;
    this.searchedId='';
  }


}
