import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { DataService } from '../data.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  auth!:string;
  orders!: any[];
  rating:any;
  TotalOrders!: any[];
  dataSource = new MatTableDataSource<any>();
  totalOrders:number = 0;
  totalRevenue:number = 0;
  totalDeliverd:number = 0;
  totalCancelled:number = 0;
  totalCustomers:number =0;

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        }
      }
    }

  };
  
  barChartLabels:string[] = [];

  barChartCustomerData: { data: number[]; label: string }[] = [
    { data: [], label: 'No of customers joined' }
  ];
  

  barChartData: { data: number[]; label: string }[] = [
    { data: [], label: 'No of product sales' }
  ];
  
 

  pieChartLabels = ['★', '★★', '★★★','★★★★','★★★★★'];
  
  pieChartData: ChartDataset<'pie', number[]>[] = [
    {
      data: [0,0,0,0,0],
      label: 'Rating'
    }
  ];

  
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec'],
    datasets: [
      {
        data: [],
        label: 'Revenue',
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.4
      }
    ]
  };

  pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
    
  }

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false
    
  }





  constructor(private dataService: DataService, private router: Router, private userService:UserService) {}

  ngOnInit(): void {
    this.dataService.auth.subscribe(data=>{
      if(data!='admin') this.router.navigateByUrl("/")
    })

    this.dataService.orders.subscribe(async data => {
      this.orders = data;
      this.TotalOrders = this.orders;
      
      this.orders.forEach(item=>{
        this.totalRevenue+=item.price;
        if(item.status=="Delivered")  this.totalDeliverd++;
        if(item.status=="Cancelled"){  
          this.totalCancelled++;
          this.totalRevenue-=item.price
        }
      })
      this.totalOrders =this.orders.length;

      

      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        this.barChartLabels.push(date.toISOString().split('T')[0]); 
      }

      this.barChartLabels.forEach(item=>{
        let count = 0;
        this.orders.forEach(orderItem=>{
          if(orderItem.date.toString().split('T')[0] == item){
            if(orderItem.status!='Cancelled'){
              orderItem.data.forEach((cartItem: { quantity: number; })=>{
                count+=cartItem.quantity
              })
            }
          }
        })
        this.barChartData[0].data.push(count)
      })
    });

    const feedback = localStorage.getItem("feedback");
    if (feedback != null && feedback != undefined) {
      this.rating = JSON.parse(feedback);

      for (const orderId in this.rating) {
        const ordersForRating = this.rating[orderId];
        for (const itemId in ordersForRating) {
          const itemProperties = ordersForRating[itemId];
          const rating = parseInt(itemProperties.rating);
          if (rating >= 1 && rating <= 5) {
            this.pieChartData[0].data[rating - 1]++;
          }
        }
      }
    }

    for (let i = 0; i < 12; i++) { 
      let total = 0;
      this.orders.forEach(item => {
        if(item.status!="Cancelled"){
          const date = new Date(item.date); 
          if (date.getMonth() === i) {
            total += item.price;
          }
        }
      }); 
      this.lineChartData.datasets[0].data.push(total);
    }
    
    // this.userService.getUsers().subscribe((data: any)=>{
    //   const userList = data;
    //   this.totalCustomers = data.length;

      
    //   const customerData: number[] = [];

    //   this.barChartLabels.forEach(labelDate => {
    //     let userCount = 0;
    //     userList.forEach((user:{registeredAt:string}) => {
    //       const registeredDate = new Date(user.registeredAt).toISOString().split('T')[0];
    //       if (registeredDate === labelDate) {
    //         userCount++;
    //       }
    //     });
    //     customerData.push(userCount);
    //   });
      
    //   // ✅ Replace the entire dataset object
    //   this.barChartCustomerData = [
    //     { data: customerData, label: 'No of Customers joined' }
    //   ];
      
    // })

    
        const userL = localStorage.getItem("userList");
        if(userL!=null){
          const userList = JSON.parse(userL)
          this.totalCustomers = userList.length;
  
        
        const customerData: number[] = [];
  
        this.barChartLabels.forEach(labelDate => {
          let userCount = 0;
          userList.forEach((user:{registeredAt:string}) => {
            const registeredDate = new Date(user.registeredAt).toISOString().split('T')[0];
            if (registeredDate === labelDate) {
              userCount++;
            }
          });
          customerData.push(userCount);
        });
        
        // ✅ Replace the entire dataset object
        this.barChartCustomerData = [
          { data: customerData, label: 'No of Customers joined' }
        ];
        
      
        }
        
        

    
  }

  

  
}
