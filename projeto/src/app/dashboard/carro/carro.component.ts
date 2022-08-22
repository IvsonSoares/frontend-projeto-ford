import { CarroService } from './carro.service';
import { VeiculoData, VeiculosData } from './../modelo/veiculos';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Observable, Subscription } from 'rxjs';
import { UntypedFormControl } from '@angular/forms';
import { CardCarroComponent } from '../card-carro/card-carro.component';
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { PoChartType, PoChartOptions, PoChartSerie, PoDialogService } from '@po-ui/ng-components';
import { ModalVeiculoComponent } from './modal-veiculo/modal-veiculo.component';
const ESPERA_DIGITACAO = 300;
const VIN_LENGTH = 3;
const BASE_PERCENTAGE = 100000;

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css'],
  providers: [PoDialogService, ModalVeiculoComponent]
})

export class CarroComponent implements OnInit {
  //Grafico
  connectedDonutChartType: PoChartType = PoChartType.Donut;
  updateSoftwareDonutChartType: PoChartType = PoChartType.Donut;
  private connectedData!: number;
  private softwareUpdatesData!: number;
  public connectedSerie!: Array<PoChartSerie>;
  public softwareUpdateSerie!: Array<PoChartSerie>;
  public optionsColumn!: PoChartOptions;

  private urlOriginal = '';
  private id: number = 1;
  veiculoData$!: Observable<VeiculoData>;
  veiculosData!: VeiculosData;
  clickEventSubscription: Subscription;

  carroInput = new UntypedFormControl();

    @Input()
    set url(url: string){
      //console.log(url);
      if(url.startsWith('data')){
        this.urlOriginal = url;
       } else {
        this.urlOriginal = `./assets/img/${url}.png`;
      }
    };

    @Input()
    set connected(connected: number) {
      //console.log(connected);
      this.connectedData = connected / BASE_PERCENTAGE;

    }

    @Input()
    set softwareUpdate(softwareUpdate: number){
      //console.log(softwareUpdate);
      this.softwareUpdatesData = softwareUpdate  / BASE_PERCENTAGE;

    }

    get url(): string{
      return this.urlOriginal;
    }

    get connected(): number{
      return
    }

    get softwareUpdate(): number{
      return
    }

    todasCarros$ = this.carroInput.valueChanges
                      .pipe(
                        debounceTime(ESPERA_DIGITACAO),
                        tap(() => {console.log('Fluxo do Filtro');}),
                        tap(console.log),
                        filter((valorDigitado) => valorDigitado.length >= VIN_LENGTH || !valorDigitado.length),
                        distinctUntilChanged(),
                        switchMap((valorDigitado) => this.carroService.getCarros(valorDigitado)))
                        .subscribe((retornoAPI) => {
                          //console.log(retornoAPI);
                          if(retornoAPI.length > 0){
                            this.veiculoData$ = this.dashboardService.getVeiculoDataById(retornoAPI[0]._id);
                            if(retornoAPI[0]['id']){
                              return this.card.inputCar(retornoAPI[0]['id'])
                            }
                          }
                        });

    constructor(
      public dashboardService: DashboardService,
      private carroService: CarroService,
      private card: CardCarroComponent
      ) {
        this.clickEventSubscription = this.dashboardService.getResquestVeiculoData().subscribe(
          id => {
            this.findVeiculoData(id);
            this.setCharts();

          })
        }
        ngOnInit(): void {
          this.dashboardService.getVeiculosData().subscribe((veiculosData) => {
            this.veiculosData = veiculosData['veiculosData'];
            this.findVeiculoData(this.id);
          })
          this.setCharts();
        }

        findVeiculoData(id: number): void{
          //console.log(this.veiculosData);

          this.veiculosData.forEach(element => {
            if(element.id === id){
              this.veiculoData$ = this.dashboardService.getVeiculoDataById(element._id);
            }
          });
        }

        setCharts(): void{
          this.connectedSerie = [{ color: '#060b36',  label: 'Connected', data: this.connectedData }, { color: '#9a9c9a', data: 1 - this.connectedData }];
          this.softwareUpdateSerie = [{ color: '#060b36', label: 'Software Update', data: this.softwareUpdatesData}, { color: '#9a9c9a', data: 1 - this.softwareUpdatesData }];
          this.optionsColumn = {
            innerRadius: 60,
            legend: false
          };
        }
  }
