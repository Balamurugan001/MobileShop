import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MobileService } from '../mobile.service';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent {

  
  form: FormGroup;
  mobiles:any[]=[];

  constructor(private fb: FormBuilder, private mobileService:MobileService,private router:Router,private dataService:DataService) {
    
    this.form = this.fb.group({
      name: [''],
      data: this.fb.group({
        color: [''],
        price: [''],
        capacity: ['']
      })
    });
  }

  get data(): FormGroup {
    return this.form.get('data') as FormGroup;
  }

  // addDataField() {
  //   this.data.push(this.fb.group({
  //     key: [''],
  //     value: ['']
  //   }));
  // }

  // removeDataField(index: number) {
  //   this.data.removeAt(index);
  // }

  submitForm() {
    const formValue = this.form.value;
    // const jsonData: any = {};

    // formValue.data.forEach((item: any) => {
    //   if (item.key) {
    //     jsonData[item.key] = item.value;
    //   }
    // });
    //
    // const payload = {
    //   name: formValue.name,
    //   data: jsonData
    // };

    const payload = {
      name: formValue.name,
      data: formValue.data
    };

    this.mobileService.addDevice(payload).subscribe(data=>{
      console.log(data)
      this.dataService.currentMobile.subscribe(data=>{
        this.mobiles = data;
      })
      this.mobiles.push(data);
      this.dataService.setMobile(this.mobiles)
      this.router.navigateByUrl("/admin")

    })

    
  }

  goToDashboard():void{
    this.router.navigateByUrl("")
  }



}
