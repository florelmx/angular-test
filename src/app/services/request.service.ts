import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class RequestService {

   constructor(
      public http: HttpClient
   ) { }

   getLocally(url: any, type: any = 'json'): Observable<any> {
      if(type){
         return this.http.get(url, { responseType: type })
      }else{
         return this.http.get(url)
      }
      
   }
}
