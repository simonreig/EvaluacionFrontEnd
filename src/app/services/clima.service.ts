import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ClimaService {

  constructor(private http:HttpClient) {  }

  base_url :string ='http://api.weatherstack.com/';
  api_key  :string ='7e530f55280c71c1421a9ebc2235f624';

  climaCiudad(ciudad:string){
    return this.http.get(`${this.base_url}current?access_key=${this.api_key}&query='${ciudad}'`);
  }

}