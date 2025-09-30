import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { ExportService } from '../export.service';
import { MobileService } from '../mobile.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  
  users:any[] = [];
  dataSource!:MatTableDataSource<any>;
  displayColumns:string[] = ['id','name','action']
    
  constructor(private router:Router,private mobile:MobileService,private dataService:DataService,private userService:UserService,private exportService:ExportService){}

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  // ngAfterViewInit(){
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  ngOnInit(): void {
   this.getUsers();
  }
  // getUsers(){
  //   this.userService.getUsers().subscribe(data=>{
  //     console.log(data)
  //     this.users = data;
  //     this.dataSource = new MatTableDataSource<any>(this.users)
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })
  // }
  // 
  // toggle(id: any):void{
  //   this.userService.ChangeUserActive(id).subscribe(data=>{
  //     console.log(data)
  //     this.getUsers();
  //   })
  // }

  getUsers(){
    const userList = localStorage.getItem("userList");
    if(userList){
      this.users = JSON.parse(userList)
      this.dataSource = new MatTableDataSource<any>(this.users)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  toggle(id: any):void{
    this.users.map(item=>{
      if(item.userid==id){
        item.active=!item.active;
      }
    })
    localStorage.setItem("userList",JSON.stringify(this.users))
    this.getUsers()
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  

  goToDashboard():void{
    this.router.navigateByUrl("");
  }

  export():void{
    this.exportService.exportToExcel(this.users,'users')
  }

  exportPdf():void{
    this.exportService.exportToPdf(this.users,'users Report')
  }
}
