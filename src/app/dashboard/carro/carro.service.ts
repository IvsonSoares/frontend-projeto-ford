import { VeiculoData } from './../modelo/veiculos';
import { environment } from './../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VeiculosAPI } from '../modelo/veiculos';
import { pluck, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarroService {

  constructor(private httpClient: HttpClient) { }

  getCarros(valor?: string){

      const params = valor ? new HttpParams().append('vehicledata_vin', valor) : undefined;
      //console.log(this.httpClient.get<VeiculosAPI>(`${environment.api}/vehicleData/vin`, {params}));
      return this.httpClient.get<VeiculosAPI>(`${environment.api}/vehicleData/vin`, {params})
      .pipe(
        pluck('veiculosData'),
        map((carros) =>
        carros.sort((carroA, carroB) =>
        this.ordenaPorCodigo(carroA, carroB)
        )
        )
        )
  }

  private ordenaPorCodigo(carroA: VeiculoData, carroB: VeiculoData){
    if(carroA.vehicledata_vin > carroB.vehicledata_vin){
      return 1;
    }

    if(carroA.vehicledata_vin < carroB.vehicledata_vin){
      return -1;
    }

    return 0;
  }
}
