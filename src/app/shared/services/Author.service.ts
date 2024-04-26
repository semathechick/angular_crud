import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseModel } from '../../models/responseModel';
import { Author } from '../../models/Author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private httpClient:HttpClient) { }
  
  getAll():Observable<ResponseModel<Author>>{
    return this.httpClient.get<ResponseModel<Author>>(
      'http://localhost:60805/api/Authors?PageIndex=0&PageSize=100'
    );
}
}