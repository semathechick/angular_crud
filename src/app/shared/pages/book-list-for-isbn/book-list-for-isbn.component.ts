import { Component, OnInit } from '@angular/core';
import { GetAllBook } from '../../../models/getAllBook';
import { Category } from '../../../models/Category';
import { Publisher } from '../../../models/publisher';
import { BookService } from '../../services/book.service';
import { CategoryService } from '../../services/category.service';
import { PublisherService } from '../../services/publisher.service';
import { ResponseModel } from '../../../models/responseModel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FilterBookListForIsbnPipe } from '../../../core/pipes/FilterBookListForIsbn.pipe';
import { Author } from '../../../models/Author';
import { AuthorService } from '../../services/Author.service';


@Component({
  selector: 'app-book-list-for-isbn',
  standalone: true,
  imports: [CommonModule,FormsModule,FilterBookListForIsbnPipe,RouterModule],
  templateUrl: './book-list-for-isbn.component.html',
  styleUrl: './book-list-for-isbn.component.scss'
})
export class BookListForIsbnComponent implements OnInit {
  bookList:GetAllBook[] = [];
  categoryList:Category[]=[];
  publisherList:Publisher[]=[];
  authorList : Author[]=[];
  today: Date = new Date();
  searchKey : string = ' ';
  constructor(private bookService : BookService,
    private categoryService:CategoryService,
    private publisherService:PublisherService,
    private authorService:AuthorService){}
  ngOnInit(): void {
    this.getCategories();
    this.getPublishers();
    this.getBooks();
    this.getAuthors();
    
  }

  getBooks(){
    this.bookService.getAll().subscribe({
      next:(response:ResponseModel<GetAllBook>)=>{
        console.log('backendden cevap geldi:',response);
        this.bookList = response.items;
        
        this.bookList.forEach(book=>{
          console.log(book.name);
          let categoryId=book.categoryId
          let publisherId=book.publisherId;
          let authorId=book.authorId;
          const category=this.categoryList.find(category=>category.id===categoryId);
          const publisher=this.publisherList.find(publisher=>publisher.id===publisherId);
          const author=this.authorList.find(author=>author.id===authorId);
          if(category && publisher && author){
            book.categoryName=category.categoryName;
            book.publisherName=publisher.name;
            book.authorName=author.name;
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
    this.categoryService.getAll().subscribe({
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

  getAuthors(){
    this.authorService.getAll().subscribe({
      next:(response:ResponseModel<Author>)=>{
        console.log('backendden cevap geldi:',response);
        this.authorList = response.items;
      },
      error : (error) =>{
        console.log('backendden hatalı cevap geldi.',error);
      },
      complete: () =>{
        console.log('backend isteği sonlandı.');
      }
    });
  }

  getBooksByCategory(){
    this.bookService
  }
  
}