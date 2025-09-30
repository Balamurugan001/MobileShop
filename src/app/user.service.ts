import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = "http://localhost:8080/user"

  constructor(private http:HttpClient) { }

  register(val:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/register",val)
  }

  getUsers():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl)
  }

  signIn(val:any):Observable<any>{
    return this.http.post<any>(this.apiUrl+"/login",val)
  }

  ChangeUserActive(id:any):Observable<any>{
    return this.http.get<any>(this.apiUrl+"/"+id)
  }

}
