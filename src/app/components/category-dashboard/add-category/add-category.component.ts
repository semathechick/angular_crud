import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../shared/services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

 categoryAddForm!:FormGroup;
 categories:Category[]=[];

 constructor(private formBuilder:FormBuilder,
  private categoryService: CategoryService){}

  ngOnInit():void{
   this.createCategoryAddForm();

  }
  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:["", (Validators.required, Validators.minLength(2))]
    })
  }
  addToDb():void{
    if(this.categoryAddForm.valid){
      const formData:Category=this.categoryAddForm.value;
      console.log(formData.categoryName);
      this.categoryService.add(formData).subscribe((response)=>{
        console.log("response",response);
      })
    }
  }

}

