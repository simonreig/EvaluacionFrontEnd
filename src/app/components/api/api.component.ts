import { Component, Input, OnInit } from '@angular/core';
import { ClimaService } from '../../services/clima.service';
import { Form } from '@angular/forms';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent{

  constructor(private climaService    : ClimaService,
              private noticiasService : NoticiasService) { }

   objetoClima:     any;
   objetoNews:      any;
   inputEntero:     any;
   temperatura:     number=0;
   sensacion:       number=0;
   icono:           string='';
   pais:            string='';
   nubes:           number=0;
   nubesStr:        string='';
   ciudadActual:    string='';
   tituloNoticia0:  string='';
   tituloNoticia1:  string='';
   tituloNoticia2:  string='';
   tituloNoticia3:  string='';
   tituloNoticia4:  string='';
   url0:            string='';
   url1:            string='';
   url2:            string='';
   url3:            string='';
   url4:            string='';


  getWeatherNoticias(input:Form){
    //Clima
    this.inputEntero = input;
    this.ciudadActual = this.inputEntero.form.controls.ciudad.value;
    if (this.ciudadActual===''){
        return;
      }
    this.climaService.climaCiudad(this.ciudadActual).subscribe(
      resp=>{this.objetoClima = resp,
      this.nubes       = this.objetoClima.current.cloudcover;
      this.temperatura = this.objetoClima.current.temperature;
      this.sensacion   = this.objetoClima.current.feelslike;
      this.icono       =  this.objetoClima.current.weather_icons[0];
      this.pais        = this.objetoClima.location.country;
      this.indicarNubes();
    });

    //Noticias
    this.noticiasService.noticiasCiudad(this.ciudadActual).subscribe(
      resp=>{this.objetoNews = resp;
      this.tituloNoticia0 = this.objetoNews.data[0].title;
      this.url0 = this.objetoNews.data[0].url;
      this.tituloNoticia1 = this.objetoNews.data[1].title;
      this.url1 = this.objetoNews.data[1].url;
      this.tituloNoticia2 = this.objetoNews.data[2].title;
      this.url2 = this.objetoNews.data[2].url;
      this.tituloNoticia3= this.objetoNews.data[3].title;
      this.url3 = this.objetoNews.data[3].url;
      this.tituloNoticia4 = this.objetoNews.data[4].title;
      this.url4 = this.objetoNews.data[4].url;
      }
    
    );

  }


  indicarNubes(){
    if(this.nubes <=10){
      this.nubesStr = 'Soleado/despejado'
    }
    if(this.nubes <=25 && this.nubes >10){
      this.nubesStr = 'Mayormente soleado'
    }
    if(this.nubes <=50 && this.nubes >25){
      this.nubesStr = 'Mayormente nublado'
    }
    if(this.nubes >50){
      this.nubesStr = 'Nublado'
    }
  }

}