import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  private apiUrl = "https://api.restful-api.dev/objects"

  constructor(private http:HttpClient) { }

  getMobiles():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  getDevice(id:any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/"+id)
  }

  deleteDevice(id:any):Observable<any>{
    return this.http.delete<any>(this.apiUrl+"/"+id)
  }

  addDevice(item:any):Observable<any>{
    console.log("Trying to add Mobile")
    return this.http.post<any>(this.apiUrl,item);
  }

  updateDevice(id:any,item:any):Observable<any>{
    console.log("Trying to Update")
    return this.http.put(this.apiUrl+"/"+id,item) 
  }

}
