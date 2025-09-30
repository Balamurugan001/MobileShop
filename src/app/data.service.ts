import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private login = new BehaviorSubject<boolean>(false);
  currentData = this.login.asObservable();

  private mobiles = new BehaviorSubject<any[]>( [{"id":"1","name":"Google Pixel 6 Pro","data":{"color":"Cloudy White","capacity":"128 GB"}},{"id":"2","name":"Apple iPhone 12 Mini, 256GB, Blue","data":null},{"id":"3","name":"Apple iPhone 12 Pro Max","data":{"color":"Cloudy White","capacity GB":512}},{"id":"4","name":"Apple iPhone 11, 64GB","data":{"price":389.99,"color":"Purple"}},{"id":"5","name":"Samsung Galaxy Z Fold2","data":{"price":689.99,"color":"Brown"}},{"id":"6","name":"Apple AirPods","data":{"generation":"3rd","price":120}},{"id":"7","name":"Apple MacBook Pro 16","data":{"year":2019,"price":1849.99,"CPU model":"Intel Core i9","Hard disk size":"1 TB"}},{"id":"8","name":"Apple Watch Series 8","data":{"Strap Colour":"Elderberry","Case Size":"41mm"}},{"id":"9","name":"Beats Studio3 Wireless","data":{"Color":"Red","Description":"High-performance wireless noise cancelling headphones"}},{"id":"10","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"64 GB","Screen size":7.9}},{"id":"11","name":"Apple iPad Mini 5th Gen","data":{"Capacity":"254 GB","Screen size":7.9}},{"id":"12","name":"Apple iPad Air","data":{"Generation":"4th","Price":"419.99","Capacity":"64 GB"}},{"id":"13","name":"Apple iPad Air","data":{"Generation":"4th","Price":"519.99","Capacity":"256 GB"}}])
  currentMobile = this.mobiles.asObservable();


  private cartItems = new BehaviorSubject<any[]>([]);
  currentCart = this.cartItems.asObservable();

  private wishlistItems = new BehaviorSubject<any[]>([]);
  currentWishlist = this.wishlistItems.asObservable();

  private orderItems = new BehaviorSubject<any[]>([]);
  orders = this.orderItems.asObservable();

  private loggedPerson = new BehaviorSubject<string>("none");
  auth = this.loggedPerson.asObservable()

  private feedback = new BehaviorSubject<any>({});
  rating = this.feedback.asObservable();

  setData(value:boolean){
    this.login.next(value);
  }

  setMobile(value:any[]){
    this.mobiles.next(value);
  }
  
  setCartItems(value:any[]){  
    this.cartItems.next(value);
  }

  setWishlistItems(value:any[]){  
    this.wishlistItems.next(value);
  }

  setOrderItem(value:any[]){
    this.orderItems.next(value)
    value.sort((a,b)=>b.id-a.id)
    localStorage.setItem("orders",JSON.stringify(value))
  }

  setAuth(value:string){
    this.loggedPerson.next(value)
  }

  setRating(value:any){
    this.feedback.next(value)
  }
}
