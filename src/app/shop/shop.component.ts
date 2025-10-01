import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import Swal from 'sweetalert2';
import { CartItem } from '../cartItem.model';
import { DataService } from '../data.service';
import { MobileService } from '../mobile.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  title = 'MobileShop';
  isAdmin:boolean = true;
  name:string="";
  search:string = "";
  WholeMobiles:any[] = [];
  Mobiles:any[] =[];
  updated:any;
  cartItems:any[]=[];
  wishlist:any[] =[];
  val!:CartItem;
  auth!:string;
  images:string[] = ["../../assets/images/offer.webp","../../assets/images/exchange.jpg","../../assets/images/hdfc.jpg","../../assets/images/fun.jpeg"]
  img:number=0 ;

  constructor(private mobile:MobileService,private router:Router, private dataService:DataService,private route:ActivatedRoute){}
  ngOnInit():void{

    this.dataService.currentData.subscribe(data=>{this.isAdmin = data})
    this.name= this.isAdmin?"Bala":"Login";
    this.dataService.currentMobile.subscribe(data=>{
      this.WholeMobiles = data;
    })
    this.Mobiles = this.WholeMobiles;
    this.dataService.currentCart.subscribe(data=>{
      this.cartItems=data;
    })
    
    this.dataService.currentWishlist.subscribe(data=> this.wishlist = data)
    
  }
  handleClick(id:any):void{
    this.dataService.auth.subscribe(data=>{
      this.auth = data;
    })
    if(this.auth=="admin")  this.router.navigateByUrl("device/"+id)
  }

  toggleControl():void{
    this.router.navigate(["login"],{queryParams:{"redirect":""}})
  }

  searchDevice(val:string):void{
    this.Mobiles = this.WholeMobiles.filter(item =>{
      val = val.toLowerCase()
      if( item.name.toLowerCase().includes(val))  return true;
      for(let key in item.data){
        if(item.data[key].toString().toLowerCase().includes(val))  return true;
      }
      return false; 
    });
  }
   
  // addDevice():void{
  //   this.router.navigateByUrl("/add")
  // }

  // deleteDevice(id:any):void{
  //   this.router.navigateByUrl("/delete");
  // }

  addToCart(id:any):void{
    const product = this.Mobiles.find(item=> item.id==id)
    const price = product.data?.Price ?? product.data?.price ?? 100
    const val = {
      id:id,
      name:product.name,
      price: price,
      quantity: 1,
      itemprice: price
    }
    console.log(val)
    this.cartItems.push(val)
    this.dataService.setCartItems(this.cartItems);
  }

  goToCart(){
    this.router.navigateByUrl("/cart")
  }

  addToWishlist(id:any){
    const product = this.Mobiles.find(item=> item.id==id)
    const price = product.data?.Price ?? product.data?.price ?? 100
    const val = {
      id:id,
      name:product.name,
      price: price,
      quantity: 1,
      itemprice: price
    }
    console.log(val)
    this.wishlist.push(val);
    this.dataService.setWishlistItems(this.wishlist);
  }

  goToWishlist(){
    this.router.navigateByUrl("/wishlist")
  }

  
  isInCart(id:any){
    const itemInCart = this.cartItems.find(item=>item.id==id);
    if(itemInCart!=null && itemInCart!=undefined) return true;
    return false;
  }

  isInWishlist(id:any){
    const itemInWishlist = this.wishlist.find(item=> item.id==id);
    if(itemInWishlist!=null && itemInWishlist!=undefined) return true;
    return false;
  }

  deleteDevice(id:any){

    Swal.fire({
      title: 'Delete Confirmination',
      text: 'Are you sure you want to Delete?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(res=>{
      if(res.isConfirmed){
        this.mobile.deleteDevice(id).subscribe(data=>{alert(data.message)})
        this.dataService.currentMobile.subscribe(data=>{this.WholeMobiles=data})
        this.Mobiles= this.WholeMobiles.filter(item=>item.id!=id)
        this.dataService.setMobile(this.Mobiles)
      }
    })

    
    this.router.navigateByUrl("")
  }

  next(){
    if(this.img<3) this.img++;
    else this.img=0;
  }

  prev(){
    if(this.img!=0) this.img--;
    else this.img=3;
  }
}
