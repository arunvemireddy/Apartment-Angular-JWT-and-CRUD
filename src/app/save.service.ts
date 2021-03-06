import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Observable, Observer } from 'rxjs'; 
import { Apartment } from './Apartment';
import { map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  private baseUrl='http://localhost:8082/api/'; 

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Credentials' : 'true',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private http:HttpClient,) { }

  saveDetails(apdetails:object):Observable<any>{
    return this.http.post(`${this.baseUrl}`+'save', apdetails,{responseType:'text'});  
    console.log(apdetails);
  }

  getDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'fetch');
  }
  updateDetails(apartment:Apartment):Observable<any>{
       return this.http.put(`${this.baseUrl}`+'update',apartment,this.httpOptions);
  }

  getOwnerDetails():Observable<any>{
    return this.http.get(`${this.baseUrl}`+'getOwnerDetais');
  }

  saveOwnerDetail(ownerDetails:object):Observable<any>{
    return this.http.post(`${this.baseUrl}`+'saveOwnerDetails', ownerDetails,{responseType:'text'}); 
  }


  getService(url:string,successCallback?,errorCallback?,params?:HttpParams){  
    console.log(params);
    return this.http.get(`${this.baseUrl}`+url,{params}).subscribe(
      (data)=>successCallback(data),
      (error)=>errorCallback(error)
    );
  }

  postService(url:string,successCallback?,errorCallback?,obj?:Object,params?:HttpParams){
    console.log(params);
    return this.http.post(`${this.baseUrl}`+url,obj,{params}).subscribe((data)=>successCallback(data),(error)=>errorCallback(error.error)); 
  }

  public generateToken(request){
      return this.http.post(`${this.baseUrl}`+'login',request,{responseType: 'text' as 'json'});
  }

  downloadService(url:string){
    
    return this.http.get(`${this.baseUrl}`+url,{ responseType: 'blob' });
  }

  getProfileService(url:string,params?:HttpParams){
    
    return this.http.get(`${this.baseUrl}`+url,{ params,responseType: 'text' });
  }
  
  uploadProfileService(url:string,params?:HttpParams,obj?:Object){
    
    return this.http.post(`${this.baseUrl}`+url,obj,{ params,responseType: 'text' });
  }
}
