import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './../home/home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { CardCarroComponent } from './card-carro/card-carro.component';
import { CarroComponent } from './carro/carro.component';
import { ModalVeiculoComponent } from './carro/modal-veiculo/modal-veiculo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CardCarroComponent,
    ModalVeiculoComponent,
    CarroComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    HomeModule,
    FormsModule
  ]
})
export class DashboardModule { }
