import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Response } from '../../../models/response';
import { ResponseModel } from '../../../models/responseModel';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../core/services/category.service.service';


@Component({
  selector: 'app-update-category',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.scss'
})
export class UpdateCategoryComponent {
  categoryUpdateForm!: FormGroup;
  getCategories: Category[] = [];
  categoryId:any;

  
  
  
  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
   private activeRoute: ActivatedRoute,
    private route: Router) { }


  ngOnInit(): void {
    
    this.getCategoryById();
    this.updateCategoryAddForm();
    
  }
  updateCategoryAddForm(){
    this.categoryUpdateForm= this.formBuilder.group({
      id:[this.categoryId],
      categoryName:["",[Validators.required, Validators.minLength(2)]],
      
    })}

  
  


  getCategoryById(){
    this.categoryId = this.activeRoute.snapshot.paramMap.get('id');
    
    
    this.categoryService.getById(this.categoryId).subscribe({
      next: (response:Response<Category>) => {
        this.getCategories=response.items;
        console.log(this.getCategories);
        console.log("Response:",response)
        
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
    
  




  updateToDb(): void {
    if (this.categoryUpdateForm.valid) {
      const formData: Category = this.categoryUpdateForm.value;
      console.log(formData.categoryName);
      this.categoryService.editCategory(formData).subscribe((response) => {
        console.log("response", response);
        alert(formData.categoryName.toUpperCase() + " başarıyla güncellendi");
      }
      );
    }
  }

}
