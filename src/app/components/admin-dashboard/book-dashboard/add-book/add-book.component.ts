import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Publisher } from '../../../../models/publisher';
import { Category } from '../../../../models/Category';
import { ResponseModel } from '../../../../models/responseModel';
import { Book } from '../../../../models/book';
import { BookService } from '../../../../core/services/book.service.service';
import { CategoryService } from '../../../../core/services/category.service.service';
import { PublisherService } from '../../../../core/services/publisher.service.service';


@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss'
})
export class AddBookComponent {
  bookAddForm !: FormGroup ;
  categories:Category[]=[];
  publishers:Publisher[]=[];
  constructor(private formBuilder:FormBuilder,
    private bookService:BookService,
    private categoryService: CategoryService,
    private publisherService:PublisherService,
    ){}
  
  
  ngOnInit(): void {
    this.createBookAddForm();
    this.getAllCategories();
    this.getAllPublishers();
  }
   
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(
      (response: ResponseModel<Category>) => {
        this.categories=response.items;
        console.log(this.categories);
      }
    )}


    getAllPublishers(){
      this.publisherService.getAllPublisher().subscribe((response:ResponseModel<Publisher>)=>{
        this.publishers=response.items;
        console.log(this.publishers);
      })
    }

    onCategoryChange(event: any) {
      const selectedCategory = event.target.value;
      const category = this.categories.find(item=>item.id==selectedCategory);
      console.log(category);
    }
  
    onPublisherChange(event: any) {
      const selectedPublisher = event.target.value;
      const publisher = this.publishers.find(item=>item.id==selectedPublisher);
      console.log(publisher);
    }
    
    
  createBookAddForm(){
    this.bookAddForm = this.formBuilder.group({
      name:["",[Validators.required, Validators.minLength(2)]],
      isbn:["",Validators.required],
      page:["",Validators.required],
      publisherId:["",Validators.required],
      categoryId:["",Validators.required],
      language:["",Validators.required],
      description:["",Validators.required],
      unitsInStock:["",[Validators.required,Validators.min(0)]],
    })
}

addToDb():void{
  if(this.bookAddForm.valid){
    const formData:Book=this.bookAddForm.value;
    console.log(formData.name);
    this.bookService.add(formData).subscribe((response)=>{
      console.log("response",response);
      
     
    }
  )}
  
  
}

}

