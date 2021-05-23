import { Component} from '@angular/core';
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

  //Input
  inputEntero:      any;
  //Clima
   objetoClima:     any;
   temperatura:     number=0;
   sensacion:       number=0;
   icono:           string='';
   pais:            string='';
   nubes:           number=0;
   nubesStr:        string='';
   ciudadActual:    string='';
   //Noticias
   objetoNews:      any;
   noticias=        [''];
   url=             [''];
   

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
      for (let i = 0; i < 5;) {
        this.noticias.push(this.objetoNews.data[i].title);
        this.url.push(this.objetoNews.data[i].url);
        i++;
      }
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