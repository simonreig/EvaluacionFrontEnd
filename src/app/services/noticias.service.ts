import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  base_url :string ='http://api.mediastack.com/v1/';
  api_key  :string ='f8fe4811a6cbb8464c398ba095880c16';

  noticiasCiudad(input:string){
    return this.http.get(`${this.base_url}news?access_key=${this.api_key}&keywords=noticias ${input}`);
  }

}