import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],
  
animations: [
  trigger('detailExpand', [
    state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
    state('expanded', style({ height: '*', display: 'block' })),
    transition('expanded <=> collapsed', animate('225ms ease-in-out')),
  ]),
]


})
export class OrderItemComponent implements OnInit {

  id = this.route.snapshot.paramMap.get("id");
  orders: any[] = [];
  orderItem!: any;
  cartItem: any[] = [];
  dataSource!: MatTableDataSource<any>;
  status!: string;
  auth!: string;
  rating!: any;

  displayedColumns: string[] = ['name', 'price', 'quantity', 'itemPrice', 'rating'];
  expandedColumns: string[] = ['expandedDetail'];
  
  expandedElement:any | null;

  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService.orders.subscribe(data => {
      this.orders = data;
    });

    this.dataService.auth.subscribe(data => {
      this.auth = data;
      // if(this.auth=='admin'){
      //   this.displayedColumns.push('feedback')
      // }
    });



    const item1 = localStorage.getItem("feedback");
    if (item1 != null) this.dataService.setRating(JSON.parse(item1));

    this.dataService.rating.subscribe(data => {
      this.rating = data[this.id || '0'];
    });

    const item = this.orders.find(item => item.id == this.id);
    if (item) {
      this.orderItem = item;
      this.status = item.status;
      this.cartItem = this.orderItem.data;
      this.dataSource = new MatTableDataSource(this.cartItem);

    }
  }

  calculateTotal() {
    return this.cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  gotoFeedback(id: any) {
    this.router.navigate(["feedback"], { queryParams: { "order_id": this.id, "item_id": id } });
  }

  getRating(id: any) {
    if (!this.rating) return "0";
    const item = this.rating[id];
    return item?.rating ?? "0";
  }

  getFeedback(id: any) {
    if (!this.rating) return "";
    const item = this.rating[id];
    return item?.feedback ?? "";
  }
}
