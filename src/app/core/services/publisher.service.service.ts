import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/responseModel';
import { Publisher } from '../../models/publisher';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private httpClient:HttpClient) {}

  getAllPublisher():Observable<ResponseModel<Publisher>>{
    return this.httpClient.get<ResponseModel<Publisher>>(
      'http://localhost:60805/api/Publishers?PageIndex=0&PageSize=10'
    );
}
   getById(id:number):Observable<Response<Publisher>>{
  return this.httpClient.get<Response<Publisher>>('http://localhost:60805/api/Publishers/'+id)
}
  add(publisher:Publisher):Observable<any>{
  const token = localStorage.getItem('Token'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.post<any>('http://localhost:60805/api/Publishers?PageIndex=0&PageSize=10',publisher,{headers:headers})
}

editPublisher(publisher:Publisher):Observable<any>{
  const token = localStorage.getItem('Token'); 
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.put<any>('http://localhost:60805/api/Publishers',publisher,{headers:headers})
}

   deletePublisher(publisherId:number){
  return this.httpClient.delete('http://localhost:60805/api/Publishers'+publisherId);
}
}

