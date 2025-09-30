import { Component,OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataService } from '../data.service';
import { ExportService } from '../export.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-delete-device',
  templateUrl: './delete-device.component.html',
  styleUrls: ['./delete-device.component.scss']
})
export class DeleteDeviceComponent implements OnInit {

  mobiles:any[] = [];
  dataSource!:MatTableDataSource<any>;
  displayColumns:string[] = ['id','name','action']
    
  constructor(private router:Router,private mobile:MobileService,private dataService:DataService,private exportService:ExportService){}

  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.dataService.currentMobile.subscribe(data=>{
      this.mobiles=data
      this.dataSource = new MatTableDataSource(this.mobiles)
      this.dataSource.filterPredicate=(item,filter)=>{ 
        return item.name.toLowerCase().includes(filter)}
    })
    
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  delete(id: any):void{
    Swal.fire({
      title: 'Delete Confirmination',
      text: 'Are you sure you want to Delete?',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then(res=>{
      if(res.isConfirmed){
        this.mobile.deleteDevice(id).subscribe(data=>{alert(data.message)})
        this.dataService.currentMobile.subscribe(data=>{this.mobiles=data})
        this.mobiles= this.mobiles.filter(item=>item.id!=id)
        this.dataService.setMobile(this.mobiles)
        this.dataSource = new MatTableDataSource(this.mobiles)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    })
    
  }

  goToDashboard():void{
    this.router.navigateByUrl("");
  }


  addDevice(): void {
    this.router.navigateByUrl("/add");
  }

  editDevice(id:any){
    this.router.navigateByUrl("/device/"+id);
  }

  deleteDevice(id: any): void {
    this.router.navigateByUrl("/delete");
  }

  export(){
    this.exportService.exportToExcel(this.mobiles,'devices')
  }

  exportPdf():void{
    this.exportService.exportToPdf(this.mobiles,'Devices')
  }
}
