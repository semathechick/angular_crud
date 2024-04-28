import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Publisher } from '../../../../models/publisher';
import { ResponseModel } from '../../../../models/responseModel';
import { PublisherService } from '../../../../core/services/publisher.service.service';

@Component({
  selector: 'app-edit-publisher',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './edit-publisher.component.html',
  styleUrl: './edit-publisher.component.scss'
})
export class EditPublisherComponent {

  publisherEditForm !: FormGroup ;
  publisherList:Publisher[]=[];
  today: Date = new Date();
  searchKey : string = ' ';

  constructor(private publisherService: PublisherService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.createPublisherEditForm();
    this.getPublisher();
   
    
  }

  getPublisher(){
    this.publisherService.getAllPublisher().subscribe({
      next:(response:ResponseModel<Publisher>)=>{
        console.log('backendden cevap geldi:',response);
        this.publisherList = response.items;
        console.log("PublisherList:",this.publisherList)
        this.publisherList.forEach(publisher=>{
          console.log(publisher.name);
         
        })
      },
      error : (error) =>{
        console.log('backendden hatalı cevap geldi.',error);
      },
      complete: () =>{
        console.log('backend isteği sonlandı.');
      }
    });
  }

  createPublisherEditForm(){
    this.publisherEditForm=this.formBuilder.group({
      name:["",Validators.required, Validators.minLength(2)]
    })
  }

  deletePublisher(event:any,publisherId:number){
    if(confirm('Bu kitabı silmek istiyor musunuz ?')){
      event.target.innerText="Siliniyor...";
      this.publisherService.deletePublisher(publisherId).subscribe((res:any)=>{
        this.getPublisher();
        console.log(res+" silindi.");
      });
    }
  }

}

