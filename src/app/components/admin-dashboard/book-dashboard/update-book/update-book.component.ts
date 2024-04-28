import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryListComponent } from '../../../category-list/category-list.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Book } from '../../../../models/book';
import { Category } from '../../../../models/Category';
import { GetAllBook } from '../../../../models/getAllBook';
import { Publisher } from '../../../../models/publisher';
import { BookService } from '../../../../shared/services/book.service';
import { CategoryService } from '../../../../shared/services/category.service';
import { PublisherService } from '../../../../shared/services/publisher.service';
import { ResponseModel } from '../../../../models/responseModel';



@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CategoryListComponent,RouterModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.scss'
})
export class UpdateBookComponent {
bookUpdateForm!: FormGroup;
  getBook: Book[] = [];
  bookList:GetAllBook[] = [];
  categories: Category[] = [];
  publishers: Publisher[] = [];
  bookId!: any;
  
  
  
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private categoryService: CategoryService,
    private publisherService: PublisherService,
    private activeRoute: ActivatedRoute,
    private route: Router) { }


  ngOnInit(): void {
    this.getAllCategories();
    this.getAllPublishers();
    this.getBookById();
    this.editBookAddForm();
    
  }
  editBookAddForm(){
    this.bookUpdateForm= this.formBuilder.group({
      id:[this.bookId],
      name:["",[Validators.required, Validators.minLength(2)]],
      isbn:["",Validators.required],
      page:["",Validators.required],
      publisherId:["",Validators.required],
      categoryId:["",Validators.required],
      language:["",Validators.required],
      description:["",Validators.required],
      unitsInStock:["",[Validators.required,Validators.min(0)]],
    })}

  
  getBoook(){
    this.bookId = this.activeRoute.snapshot.paramMap.get('id');
    this.bookService.getById(this.bookId).subscribe((response:Response<Book>)=>{
      
      this.getBook=response.items.map((data:any)=>new Book(data));
      console.log(this.getBook)
    })
  }


  getBookById(){
    this.bookId = this.activeRoute.snapshot.paramMap.get('id');
    
    
    this.bookService.getById(this.bookId).subscribe({
      next: (response:Response<Book>) => {
        this.getBook=response.items;
        console.log(this.getBook);
        console.log("Response:",response)
        
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
      }
    });
  }
    
  getAllCategories() {
    this.categoryService.getAllCategory().subscribe(
      (response: ResponseModel<Category>) => {
        this.categories = response.items;
        console.log(this.categories);
      }
    );
  }

  getAllPublishers() {
    this.publisherService.getAllPublisher().subscribe((response: ResponseModel<Publisher>) => {
      this.publishers = response.items;
      console.log(this.publishers);
    });
  }
  onCategoryChange(event: any) {
    const selectedCategory = event.target.value;
    const category = this.categories.find(item => item.id == selectedCategory);
    console.log(category);
  }
  onPublisherChange(event: any) {
    const selectedPublisher = event.target.value;
    const publisher = this.publishers.find(item => item.id == selectedPublisher);
    console.log(publisher);
  }

  updateToDb(): void {
    if (this.bookUpdateForm.valid) {
      const formData: Book = this.bookUpdateForm.value;
      console.log(formData.name);
      this.bookService.editBook(formData).subscribe((response) => {
        console.log("response", response);
        alert(formData.name.toUpperCase() + " başarıyla güncellendi");
      }
      );
    }
  }
 

}



