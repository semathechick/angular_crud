import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpClient, HttpErrorResponse } from "@angular/common/http"; 
import { Observable } from "rxjs";
import { ResponseModel } from "../../../models/responseModel";
import { BookService } from "../../../core/services/book.service.service";

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class HomepageComponent {
  searchCriteria: string = "KatalogTarama"; 
  searchKey: string = ""; 

  constructor(private router: Router, private httpClient: HttpClient, private bookService: BookService) {} 

  onSearch() {
    if (this.searchCriteria === "ISBN") {
      if (this.searchKey.trim() === "") {
        console.log('ISBN does not match.');
      } else {
       
        this.bookService.checkISBNInDatabase(this.searchKey).subscribe((response: ResponseModel<any>) => {
          if (response.items.some((book: any) => book.isbn === this.searchKey)) {
            console.log('ISBN matches.');
           
            this.router.navigate(['/book-list-for-isbn'], { queryParams: { isbn: this.searchKey } });
          } else {
            console.log('ISBN does not exist in the database.');
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === 400) {
            console.log('ISBN does not match.');
          } else {
            console.error('An unexpected error occurred:', error.message);
          }
        });
      }
    } else {
      
      this.filterResults(this.searchKey);
    }
  }
  
  
  

  filterResults(value: string) {
    
  }
}


  
  


