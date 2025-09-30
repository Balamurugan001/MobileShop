import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  item: any = {};
  dataKeys: string[] = [];

  mobiles:any[] = [];

  constructor(
    private route: ActivatedRoute,
    private mobileService: MobileService,
    private router: Router,
    private dataService:DataService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.mobileService.getDevice(id).subscribe((data) => {
      this.item = data;
      this.dataKeys = Object.keys(this.item.data || {});
    });
  }

  handleClick(): void {
    this.router.navigateByUrl('/delete');
  }

  handleDelete(): void {
    this.mobileService.deleteDevice(this.item.id).subscribe(data=>{alert(data.message)})
    this.dataService.currentMobile.subscribe(data=>{this.mobiles=data})
    this.mobiles= this.mobiles.filter(item=>item.id!=this.item.id)
    this.dataService.setMobile(this.mobiles)
    this.router.navigateByUrl("")
  }

  handleSubmit(): void {
    this.mobileService.updateDevice(this.item.id,this.item).subscribe((data) => {
      this.dataService.currentMobile.subscribe(devices=>{
        this.mobiles=devices;
      })

      this.mobiles.map(item=>{
        if(item.id==this.item.id){
          item.name = data.name;
          item.data = data.data;
        }
      })

      this.router.navigateByUrl("/delete")
      
    });
  }

  isText(value: any): boolean {
    return typeof value === 'string';
  }

  isNumber(value: any): boolean {
    return typeof value === 'number';
  }

  isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
