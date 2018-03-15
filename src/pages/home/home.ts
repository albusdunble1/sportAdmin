import { Subscription } from 'rxjs/Subscription';
import { CommonProvider } from './../../providers/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy{

  reservationRef$;
  reservationObservable;
  reservationsArray =[];
  filteredArray=[];
  reservationTimeRef$;
  reservationAfterChecking;
  index:string;
  courtName:string;
  loading;
  searchedId:string;


  segment: string;
  reservationSub: Subscription;




  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, private common: CommonProvider) {

    this.segment="pending";
    

    this.reservationRef$= this.afDB.list('reservation');
    this.reservationObservable = this.reservationRef$.snapshotChanges()
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

    this.reservationSub=this.reservationObservable.subscribe(
      (reservationStuff) =>{
        this.reservationsArray= reservationStuff;
        this.filteredArray=this.reservationsArray.filter(x => x.approvedStatus === false || x.paidStatus === false);
        this.loading.dismiss();
        
      }
    )
  }

  onApprove(key: string, reservationKey:string, time:string, date:string, item:string, category:string, reservationID: number){
    if(category==='badminton'){
      this.index= '0';
      if(item==='Badminton Court 1'){
        this.courtName='bcourt1';
      }else if(item ==='Badminton Court 2'){
        this.courtName='bcourt2';
      }else if(item ==='Badminton Court 3'){
        this.courtName='bcourt3';
      }else if(item ==='Badminton Court 4'){
        this.courtName='bcourt4';
      }else if(item ==='Badminton Court 5'){
        this.courtName='bcourt5';
      }else if(item ==='Badminton Court 6'){
        this.courtName='bcourt6';
      }else if(item ==='Badminton Court 7'){
        this.courtName='bcourt7';
      }else if(item ==='Badminton Court 8'){
        this.courtName='bcourt8';
      }else if(item ==='Badminton Court 9'){
        this.courtName='bcourt9';
      }else if(item ==='Badminton Court 10'){
        this.courtName='bcourt9a';
      }else if(item ==='Badminton Court 11'){
        this.courtName='bcourt9b';
      }else if(item ==='Badminton Court 12'){
        this.courtName='bcourt9c';
      }
    }else if(category ==='squash'){
      this.index='3';
      if(item==='Squash Court 1'){
        this.courtName='scourt1';
      }else if(item ==='Squash Court 2'){
        this.courtName='scourt2';
      }
    }else if(category ==='takraw'){
      this.index='4';
      if(item==='Sepak Takraw Court 1'){
        this.courtName='stcourt1';
      }else if(item ==='Sepak Takraw Court 2'){
        this.courtName='stcourt2';
      }else if(item ==='Sepak Takraw Court 3'){
        this.courtName='stcourt3';
      }else if(item ==='Sepak Takraw Court 4'){
        this.courtName='stcourt4';
      }
    }else if(category ==='basketball'){
      this.index='1';
      if(item==='Basketball Court 1'){
        this.courtName='bbcourt1';
      }
    }else if(category ==='football'){
      this.index='2';
      if(item==='Football Field'){
        this.courtName='ffield';
      }
    }
    this.afDB.object('/reservation/'+ key).update({approvedStatus: true});
    this.afDB.object('/reservationTimes/'+ time+'/'+date+'/'+reservationKey+'/category/'+this.index+'/courts/'+ this.courtName).update({isBooked: true});
    this.common.toastPop('Approved request #'+ reservationID,'bottom').present();

 
  }

  ionViewDidLoad(){
    this.loading=this.common.loadingSpinner('Loading');
    this.loading.present();
  }

  onReject(key: string, reservationID: number){
    console.log('rejected');
    this.afDB.object('/reservation/'+ key).remove();
    this.common.toastPop('Rejected request #'+ reservationID,'bottom').present();
  }



  onPaid(key :string, reservationID: string){
    console.log('Paid');
    this.afDB.object('/reservation/'+ key).update({paidStatus: true});
    this.common.toastPop('#'+reservationID + ' has paid','bottom').present();
  }

  onInput(event){
    if(this.searchedId !== ''){
      // this.filteredArray= this.allReservation.filter(x=> x.reservationID.toString().startsWith(this.searchedId) !== -1);
      this.filteredArray= this.reservationsArray.filter(x=> 
        x.reservationID.toString().substring(0,this.searchedId.length)=== this.searchedId);
    }else{
      this.filteredArray= this.reservationsArray;
    }
  
  }

  onCancel(){

  }

  ngOnDestroy(){
    this.reservationSub.unsubscribe();
  }

}
