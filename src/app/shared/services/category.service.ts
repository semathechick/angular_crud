import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Category } from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient:HttpClient) { }

  getAll():Observable<ResponseModel<Category>>{
      return this.httpClient.get<ResponseModel<Category>>(
        'http://localhost:60805/api/Categories?PageIndex=0&PageSize=100'
      );
  }
}
