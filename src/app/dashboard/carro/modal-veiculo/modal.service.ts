import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VeiculoData } from '../../modelo/veiculos';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private httpClient: HttpClient) { }

  deleteCarro(valor?: string){
    this.httpClient.delete(`${environment.api}/vehicleData/${valor}`).subscribe(retorno =>
      console.log(retorno)
    )
  }

  getVeiculoDataById(id: string): Observable<VeiculoData>{
    //console.log("GetById", this.httpClient.get<VeiculoData>(`${environment.api}/vehicleData/${id}`));
    return this.httpClient.get<VeiculoData>(`${environment.api}/vehicleData/${id}`);
   }

   updateVeiculo(id: string, veiculo: VeiculoData){
      this.httpClient.put(`${environment.api}/vehicleData/${id}`, veiculo).subscribe(retorno =>
        console.log(retorno)
      )
   }

   createVeiculo(veiculo: any){
    console.log("veiculo: ", veiculo);

    this.httpClient.post(`${environment.api}/vehicleData/`, veiculo).subscribe(retorno =>
        console.log(retorno)
      )
   }

}
