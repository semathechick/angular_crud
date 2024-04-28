import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CategoryListComponent } from "../../../category-list/category-list.component";
import { RouterModule } from "@angular/router";
import { FilterlistPipe } from "../../../../core/pipes/filterlist.pipe";
import { FilterBookListForCategoryPipe } from "../../../../core/pipes/FilterBookListForCategory.pipe";
import { GetAllBook } from "../../../../models/getAllBook";
import { Publisher } from "../../../../models/publisher";
import { Category } from "../../../../models/Category";
import { ResponseModel } from "../../../../models/responseModel";
import { BookService } from "../../../../core/services/book.service.service";
import { CategoryService } from "../../../../core/services/category.service.service";
import { PublisherService } from "../../../../core/services/publisher.service.service";


@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,CategoryListComponent,RouterModule,FilterlistPipe,FilterBookListForCategoryPipe],
  templateUrl: './edit-book.component.html',
  styleUrl: './edit-book.component.scss'
})
export class EditBookComponent {
  bookEditForm !: FormGroup; 
  bookList:GetAllBook[] = [];
  categoryList:Category[]=[];
  publisherList:Publisher[]=[];
  today: Date = new Date();
  searchKey : string = ' ';
  
  constructor(private bookService : BookService,
    private categoryService:CategoryService,
    private publisherService:PublisherService,
    private formBuilder:FormBuilder){}

  ngOnInit(): void {
    this.getCategories();
    this.getPublishers();
    this.getBooks();
    
  }

  getBooks(){
    this.bookService.getAll().subscribe({
      next:(response:ResponseModel<GetAllBook>)=>{
        console.log('backendden cevap geldi:',response);
        this.bookList = response.items;
        console.log("BookList:",this.bookList)
        this.bookList.forEach(book=>{
          console.log(book.name);
          let categoryId=book.categoryId
          let publisherId=book.publisherId;
          const category=this.categoryList.find(category=>category.id==categoryId);
          const publisher=this.publisherList.find(publisher=>publisher.id==publisherId);
          if(category && publisher){
            
            book.categoryName=category.categoryName;
            book.publisherName=publisher.name;
          }
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

  getCategories(){
    this.categoryService.getAllCategory().subscribe({
      next:(response:ResponseModel<Category>)=>{
        console.log('backendden cevap geldi:',response);
        this.categoryList = response.items;
      },
      error : (error) =>{
        console.log('backendden hatalı cevap geldi.',error);
      },
      complete: () =>{
        console.log('backend isteği sonlandı.');
      }
    });
  }
  getPublishers(){
    this.publisherService.getAllPublisher().subscribe({
      next:(response:ResponseModel<Publisher>)=>{
        console.log('backendden cevap geldi:',response);
        this.publisherList = response.items;
      },
      error : (error) =>{
        console.log('backendden hatalı cevap geldi.',error);
      },
      complete: () =>{
        console.log('backend isteği sonlandı.');
      }
    });
  }
  deleteBook(event:any,bookId:number){
    if(confirm('Bu kitabı silmek istiyor musunuz ?')){
      event.target.innerText="Siliniyor...";
      this.bookService.deleteBook(bookId).subscribe((res:any)=>{
        this.getBooks();
        console.log(res+" silindi.");
      });
    }
  }

  

}

