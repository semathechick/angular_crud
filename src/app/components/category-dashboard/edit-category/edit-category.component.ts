import { Component } from '@angular/core';
import { ResponseModel } from '../../../models/responseModel';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../models/Category';
import { CategoryService } from '../../../core/services/category.service.service';


@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {
  categoryEditForm !: FormGroup ;
  categoryList:Category[]=[];
  today: Date = new Date();
  searchKey : string = ' ';

  constructor(private categoryService:CategoryService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.createCategoryEditForm();
    this.getCategories();
   
    
  }

  getCategories(){
    this.categoryService.getAllCategory().subscribe({
      next:(response:ResponseModel<Category>)=>{
        console.log('backendden cevap geldi:',response);
        this.categoryList = response.items;
        console.log("CategoryList:",this.categoryList)
        this.categoryList.forEach(category=>{
          console.log(category.categoryName);
         
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

  createCategoryEditForm(){
    this.categoryEditForm=this.formBuilder.group({
      categoryName:["",Validators.required, Validators.minLength(2)]
    })
  }

  deleteCategory(event:any,categoryId:number){
    if(confirm('Bu kitabı silmek istiyor musunuz ?')){
      event.target.innerText="Siliniyor...";
      this.categoryService.deleteCategory(categoryId).subscribe((res:any)=>{
        this.getCategories();
        console.log(res+" silindi.");
      });
    }
  }
}

