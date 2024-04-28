import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Author } from '../../models/Author';


@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  apiUrl="http://localhost:60805/api/Authors";
  constructor(private httpClient:HttpClient) { }

  getAllAuthors():Observable<ResponseModel<Author>>{
    return this.httpClient.get<ResponseModel<Author>>
    (this.apiUrl+'?PageIndex=0&PageSize=10');
  }

  add(author:Author):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(this.apiUrl,author,{headers:headers})
  }

}