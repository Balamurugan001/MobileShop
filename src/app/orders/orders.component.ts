import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { ExportService } from '../export.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {


@Input() dataSource: MatTableDataSource<any> = new MatTableDataSource();




displayedColumns:string[] = ["id","date","price","action"]

auth!:string;
user!:any;
userId!:any;
totalOrders:any[] = [];
orders: any[] = [];

constructor(private dataService: DataService,private router:Router,private exportService:ExportService,private route:ActivatedRoute) {}

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;



ngAfterViewInit() {
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}


ngOnInit(): void {

  this.userId= this.route.snapshot.paramMap.get("id")

  this.dataService.orders.subscribe(data => {
    this.totalOrders = data
    this.orders = this.getOrders();
    this.orders.sort(item=> item.id)
    
    
    this.dataSource = new MatTableDataSource(this.orders);
  });

  this.dataService.auth.subscribe(data=>{this.user = data})
  this.dataService.auth.subscribe(data=>this.auth=data)
  
}


getOrders():any[]{
  if(this.userId!=0){
    return this.totalOrders.filter(item=>item.userId==this.userId)
  }
  return this.totalOrders
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

 
cancelOrder(orderId: number) {
  
  this.orders.map(item=>{
    if(item.id==orderId){
      item.status="Cancelled"
    }
  })

  Swal.fire({
    title: 'Ordered Cancelled',
    text: 'Want different, Order again',
    icon: 'warning',
    confirmButtonText: 'OK'
  });

  this.dataService.setOrderItem(this.orders)
  this.dataSource = new MatTableDataSource(this.orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  
  
}

goToOrderItem(id:any){
  this.router.navigateByUrl("/order/"+id)
}



search(form: any): void {
  const from = new Date(form.controls.from.value);
  const to = new Date(form.controls.to.value);
  to.setDate(to.getDate()+1)
  const orders = this.orders.filter(item => {
    const date: Date = new Date(item.date);
    return date >= from && date <= to;
  });
  
  this.dataSource = new MatTableDataSource(orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

resetFilter(){
  this.dataSource = new MatTableDataSource(this.orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

ship(id:any){
  this.orders.map(item=>{
    if(item.id==id){
      item.status="shipped"
    }
  })
  this.dataService.setOrderItem(this.orders)
  this.dataSource = new MatTableDataSource(this.orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

deliver(id:any){
  this.orders.map(item=>{
    if(item.id==id){
      item.status="Delivered"
    }
  })
  this.dataService.setOrderItem(this.orders)
  this.dataSource = new MatTableDataSource(this.orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

export():void{
  this.exportService.exportToExcel(this.orders,'orders')
}

exportPdf():void{
  this.exportService.exportToPdf(this.orders,'orders Report')
}

reorder(id:any){
  const oldOrder = this.orders.find(item => item.id==id)
  const newOrder = {
    id: this.orders.length+1,
    userId:this.userId,
    date: new Date(),
    data: oldOrder.data,
    status:"Ordered",
    price: oldOrder.price
  }
  this.totalOrders.push(newOrder);

  localStorage.setItem("orders",JSON.stringify(this.totalOrders))
  this.dataService.setOrderItem(this.totalOrders);
  this.orders = this.getOrders();
  this.dataSource = new MatTableDataSource(this.orders)
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;

  Swal.fire({
    title: 'Ordered Successfully',
    text: 'Thank you, Visit us again',
    icon: 'success',
    confirmButtonText: 'OK'
  });
}

}
