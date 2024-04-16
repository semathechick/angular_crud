import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Publisher } from '../../models/publisher';
import { ResponseModel } from '../../models/responseModel';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private httpClient:HttpClient) {}

  getAllPublisher():Observable<ResponseModel<Publisher>>{
    return this.httpClient.get<ResponseModel<Publisher>>(
      'http://localhost:60805/api/Publishers?PageIndex=0&PageSize=100'
    );
}
}
