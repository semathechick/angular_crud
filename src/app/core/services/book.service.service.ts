
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { GetAllBook } from '../../models/getAllBook';
import { Book } from '../../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private selectedBookSubject = new BehaviorSubject<any>(null);
  selectedBook$ = this.selectedBookSubject.asObservable();

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "http://localhost:60805/api/Books";
  
  getAll():Observable<ResponseModel<GetAllBook>>{
      return this.httpClient.get<ResponseModel<GetAllBook>>(
        this.apiUrl+'?PageIndex=0&PageSize=100'
      );
  }

  checkISBNInDatabase(searchKey: string): Observable<ResponseModel<any>> {
    if (searchKey) { // Eğer searchKey varsa
      return this.httpClient.get<ResponseModel<any>>(this.apiUrl + '?PageIndex=0&PageSize=100' + searchKey);
    } else { // Eğer searchKey yoksa
      // Boş bir Observable döndür
      return of({items: [],
        index: 0,
        size: 0,
        count: 0,
        pages: 0,
        hasPrevious: false,
        hasNext: false});
    }
  }

  getById(id:number):Observable<Response<Book>>{
    return this.httpClient.get<Response<Book>>('http://localhost:60805/api/Books/'+id)
  }
  
  add(book:Book):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(this.apiUrl,book,{headers:headers})
  }

  editBook(book:Book):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(this.apiUrl,book,{headers:headers})
  }
  deleteBook(bookId:number){
    return this.httpClient.delete('http://localhost:60805/api/Books'+bookId);
  }

  
 
}
