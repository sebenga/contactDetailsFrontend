import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  base_url = environment.API_URL

  constructor(private http: HttpClient) { }

  getAllContacts(){
    return this.http.get<any>(this.base_url + 'contact')
  }

  createContact(json:any){
    return this.http.post<any>(this.base_url + 'contact',json)
  }

  updateContact(json:any){
    return this.http.put<any>(this.base_url + 'contact',json)
  }

  deleteContact(id:Number){
    return this.http.delete<Number>(this.base_url + 'contact/'+id+'')
  }
}
