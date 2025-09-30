import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {
  id!: string;
  orderId!:string
  rating:number = 3
  feedbackForm!: FormGroup;
  feedabackRating: any = {};

  
stars = Array(5).fill(0);

rate(value: number) {
  this.rating = value;
  console.log(this.rating)
}

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router:Router,private dataService:DataService) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get("item_id") || "" ;
    this.orderId = this.route.snapshot.queryParamMap.get("order_id") || "";

    

    this.feedbackForm = this.fb.group({
      rating: ['', Validators.required],
      feedback: ['']
    });

    this.dataService.rating.subscribe(data=>{
      this.feedabackRating = data;
    })

    const local = localStorage.getItem("feedback")
    if(local!=null){
      this.feedabackRating = JSON.parse(local) || {};
    }
    
  }

  

  onSubmit(): void {
      this.updateOrderItem(this.feedbackForm.get("feedback")?.value)
      this.router.navigateByUrl("/order/"+this.orderId)
  }
  
    
    updateOrderItem(feedback: string): void {
      if (!this.feedabackRating[this.orderId]) {
        this.feedabackRating[this.orderId] = {};
      }
      this.feedabackRating[this.orderId][this.id] = { "rating":this.rating, "feedback":feedback };
      console.log(this.feedabackRating)
      this.dataService.setRating(this.feedabackRating)
      localStorage.setItem("feedback",JSON.stringify(this.feedabackRating))

    }
}