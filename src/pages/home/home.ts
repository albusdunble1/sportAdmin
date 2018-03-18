import { Subscription } from 'rxjs/Subscription';
import { CommonProvider } from './../../providers/common';
import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy{

  reservationRef$;
  reservationObservable;
  reservationsArray =[];
  filteredArray=[];
  filteredArray1=[];
  filteredArray2=[];
  reservationTimeRef$;
  reservationAfterChecking;
  index:string;
  courtName:string;
  loading;
  searchedId:string;


  segment: string;
  reservationSub: Subscription;
  adminID: string;
  adminName:string;
  adminEmail:string;
  adminSub: Subscription;
  adminObject;



  constructor(public navCtrl: NavController, private afDB: AngularFireDatabase, private common: CommonProvider) {

    this.segment="pending";
    
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
        this.filteredArray2=this.filteredArray;
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


    this.afDB.object('/reservation/'+ key).update({approvedStatus: true, approvedBy: this.adminObject.name});
    this.afDB.object('/reservationTimes/'+ time+'/'+date+'/'+reservationKey+'/category/'+this.index+'/courts/'+ this.courtName).update({isBooked: true});
    this.common.toastPop('Approved request #'+ reservationID,'bottom').present();
    this.searchedId='';

 
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
    this.afDB.object('/reservation/'+ key).update({paidStatus: true, payreceivedBy:this.adminObject.name});
    this.common.toastPop('#'+reservationID + ' has paid','bottom').present();
    this.searchedId='';
  }

  onInput(event){
    if(this.searchedId !== ''){
      // this.filteredArray= this.allReservation.filter(x=> x.reservationID.toString().startsWith(this.searchedId) !== -1);
      this.filteredArray2= this.filteredArray.filter(x=> 
        x.reservationID.toString().substring(0,this.searchedId.length)=== this.searchedId);
    }else{
      this.filteredArray2= this.filteredArray;
    }
  
  }

  onCancel(){

  }

  ngOnDestroy(){
    this.reservationSub.unsubscribe();
    this.adminSub.unsubscribe();
  }

//   sendEmail(){
    
//     $.ajax(
// 	{
    
//     url: "https://api.mailgun.net/v3/juel.mydomain.com",
// 		type:"POST",
// 		username: 'key-485ec952f8804bded980eaf0d2e0925a',
//     password: '3999c535525dd12fd1f5ad60e36450f5-833f99c3-c0b33c79',
//     dataType: 'json',
// 		data:{
// 			"html": `<h1>TITLE-HERE lololol</h1>`,
// 			"subject":"Hello Ng Wei Sheng",
// 			"from": "User<postmaster@juel.mydomain.com>",
// 			"to": "weisheng_rules@hotmail.com"
// 		},
// 		success:function(a,b,c){
// 			console.log( 'mail sent: ', b );
// 		}.bind(this),
// 		error:function( xhr, status, errText ){console.log( 'mail sent failed: ', xhr.responseText );}
// 	})

    
  

// }
}
