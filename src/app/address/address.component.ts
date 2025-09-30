import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  order!:any[]
  orderItem!:any[]
  address:any[] = []
  displayAddress:boolean =false

  ngOnInit(): void {
    this.dataService.orders.subscribe((data)=>{
      this.order = data
    })
    const ad = localStorage.getItem("address")
    if(ad!=null)  this.address =JSON.parse(ad) 

  }

  constructor(private router:Router, private dataService:DataService){}

  displayTextarea(){
    this.displayAddress = !this.displayAddress; 
  }
  calculateTotal():any{
    return this.orderItem.reduce((total,item)=> total+item.price*item.quantity,0)
  }


  handleSubmit(form:any){
    
    this.dataService.currentCart.subscribe((data)=>{
      this.orderItem = data
    })


    const val = {
      id: this.order.length+1,
      date: new Date(),
      data: this.orderItem,
      status:"Ordered",
      price: this.calculateTotal()
    }
    this.order.push(val)
    console.log("Current order: "+this.order)
    const newAdd =form.controls.add.value;
    if(newAdd!=undefined && newAdd!=null){
      if (!this.address.includes(newAdd)) {
        this.address.push(newAdd);
      }
    }
    localStorage.setItem("address",JSON.stringify(this.address))
    

    localStorage.setItem("orders",JSON.stringify(this.order))
    this.dataService.setOrderItem(this.order);
    this.dataService.setCartItems([]);

    
    

    Swal.fire({
      title: 'Ordered Successfully',
      text: 'Thank you, Visit us again',
      icon: 'success',
      confirmButtonText: 'OK'
    });

    this.router.navigateByUrl("")
    
  }

}
