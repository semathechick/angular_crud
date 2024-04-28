import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Category } from '../../models/Category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

 
  apiUrl="http://localhost:5278/api/Categories";
  constructor(private httpClient:HttpClient) { }

  getAllCategory():Observable<ResponseModel<Category>>{
    return this.httpClient.get<ResponseModel<Category>>
    ('http://localhost:60805/api/Categories?PageIndex=0&PageSize=10');
  }

  getById(id:number):Observable<Response<Category>>{
    return this.httpClient.get<Response<Category>>('http://localhost:60805/api/Categories/'+id)
  }

  add(category:Category):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(this.apiUrl,category,{headers:headers})
  }
  editCategory(category:Category):Observable<any>{
    const token = localStorage.getItem('Token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<any>(this.apiUrl,category,{headers:headers})
  }

  deleteCategory(categoryId:number){
    return this.httpClient.delete('http://localhost:60805/api/Categories'+categoryId);
  }
}
