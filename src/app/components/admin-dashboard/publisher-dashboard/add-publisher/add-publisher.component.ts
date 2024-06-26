import { Component } from '@angular/core';

import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublisherService } from '../../../../core/services/publisher.service.service';
import { Publisher } from '../../../../models/publisher';

@Component({
  selector: 'app-add-publisher',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-publisher.component.html',
  styleUrl: './add-publisher.component.scss'
})
export class AddPublisherComponent {
  publisherAddForm!:FormGroup;
 publisher:Publisher[]=[];

 constructor(private formBuilder:FormBuilder,
  private publisherService: PublisherService){}

  ngOnInit():void{
   this.createPublisherAddForm();

  }
  createPublisherAddForm(){
    this.publisherAddForm=this.formBuilder.group({
      name:["", (Validators.required, Validators.minLength(2))]
    })
  }
  addToDb():void{
    if(this.publisherAddForm.valid){
      const formData:Publisher=this.publisherAddForm.value;
      console.log(formData.name);
      this.publisherService.add(formData).subscribe((response)=>{
        console.log("response",response);
      })
    }
  }
}