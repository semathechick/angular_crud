import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { ResponseModel } from '../../models/responseModel';
import { GetAllBook } from '../../models/getAllBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient:HttpClient) { }
  apiUrl:string = "http://localhost:60805/api/Books";
  getAll():Observable<ResponseModel<GetAllBook>>{
      return this.httpClient.get<ResponseModel<GetAllBook>>(
        this.apiUrl+'?PageIndex=0&PageSize=100'
      );
  }

  add(book:Book):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(this.apiUrl,book,{headers:headers})
  }
}
