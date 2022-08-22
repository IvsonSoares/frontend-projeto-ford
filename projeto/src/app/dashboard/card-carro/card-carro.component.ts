import { UntypedFormControl } from '@angular/forms';
import { Veiculos } from './../modelo/veiculos';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Veiculo } from '../modelo/veiculos';



@Component({
  selector: 'app-card-carro',
  templateUrl: './card-carro.component.html',
  styleUrls: ['./card-carro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CardCarroComponent implements OnInit {
  // @Input() veiculo: any;
  cardInput = new UntypedFormControl();
  veiculos: Veiculos;
  veiculo: Veiculo;

  selected: number = 1;



  constructor(private dashboardService: DashboardService) {
  }

    ngOnInit(): void {


      this.dashboardService.getVeiculo().subscribe((retornoApi) => {
      this.veiculos = retornoApi['veiculos'];
      this.selectOption(this.selected);

    })

      //conseguir pegar o veiculo pelo id
      //this.selected

    }
      selectOption(id: number) {
        const veiculoId = parseInt(id.toString());
        //  this.dashboardService.getVeiculoById(id).subscribe((retornoAPI => {
        //  this.veiculo = retornoAPI;
        //  }))
        for(let i = 0; i < this.veiculos.length; i++){
          if(this.veiculos[i]['id'] === veiculoId){
            this.veiculo = this.veiculos[i]
          }
        }
         this.dashboardService.sendRequestVeiculoData(veiculoId);
       }

      inputCar(id: number){
        this.selectOption(id);
      }
}
