import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ Api } from '../../providers/api/api';

/**
 * Generated class for the AddnewproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addnewproduct',
  templateUrl: 'addnewproduct.html',
})
export class AddnewproductPage {
product:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public api:Api) {
  
  
  this.api.getProduct().subscribe(
    data=>{
	this.product=data.data;
     console.log(data);
    },
    err=>{
	console.log('err');
       },
      ()=>console.log('api is calling')
	);
    }
    ionViewDidLoad() {
    console.log('ionViewDidLoad AddnewproductPage');
  }
    

  
addProduct(category,product,price,qty,unit,stock){
let p=this.api.callPost(category,product,price,qty,unit,stock);
 p.then(data => {
console.log(data);
//console.log("Received " + JSON.stringify(data.json().data));
  
  })	
}
}
