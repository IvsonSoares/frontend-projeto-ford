import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Veiculo, Veiculos, VeiculoData, VeiculosData} from './modelo/veiculos';
@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  getVeiculo(){
    return this.httpClient.get<Veiculos>(`${environment.api}/vehicle`);
  }

  getVeiculosData(){
    return this.httpClient.get<VeiculosData>(`${environment.api}/vehicleData/`);
  }

  // getVeiculoById(id: number): Observable<Veiculo>{
  //   const idInput = id ? id : 1;
  //   return this.httpClient.get<Veiculo>(`${environment.api}/vehicle/${idInput}`);
  // }

  getVeiculoDataById(id: string): Observable<VeiculoData>{
    //console.log("GetById", this.httpClient.get<VeiculoData>(`${environment.api}/vehicleData/${id}`));

    return this.httpClient.get<VeiculoData>(`${environment.api}/vehicleData/${id}`);
   }

   getResquestVeiculoData(): Observable<any>{
     return this.subject.asObservable();
   }

   sendRequestVeiculoData(id: number){
     this.subject.next(id);
  }

}
