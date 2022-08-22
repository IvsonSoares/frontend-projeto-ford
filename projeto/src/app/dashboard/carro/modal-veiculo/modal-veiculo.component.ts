import { VeiculoData } from './../../modelo/veiculos';
import { Component, ViewChild, OnInit, ViewChildren, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { PoCheckboxGroupOption, PoComboOption } from '@po-ui/ng-components';
import { PoModalAction } from '@po-ui/ng-components';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoModalComponent } from '@po-ui/ng-components';
import { ModalService } from './modal.service';
@Component({
  selector: 'app-modal-veiculo',
  templateUrl: './modal-veiculo.component.html',
  styleUrls: ['./modal-veiculo.component.css']
})
export class ModalVeiculoComponent implements OnInit{
  @ViewChild('modal', {read: PoModalComponent, static: true}) poModal: PoModalComponent;

  private accompaniment: string;
  private id: string;
  private vin: string;
  private odometer: string;
  private lat: string;
  private long: string;
  private tirePressure: string;
  private fuelLevel: string;
  private status: string;
  private batteryStatus: string;

  public veiculoForm: FormGroup;
  public confirmOp: number;

  @Input()
    set veiculoData(veiculoData:any){
      this.id = veiculoData._id;
      this.vin = veiculoData.vehicledata_vin;
      this.odometer = veiculoData.vehicledata_odometer;
      this.lat = veiculoData.vehicledata_lat;
      this.long = veiculoData.vehicledata_long;
      this.tirePressure = veiculoData.vehicledata_tirePressure;
      this.fuelLevel = veiculoData.vehicledata_fuelLevel;
      this.status = veiculoData.vehicledata_status;
      this.batteryStatus = veiculoData.vehicledata_batteryStatus;
    };


  close: PoModalAction = {
    action: () => {
      this.closeModal();
    },
    label: 'Close',
    danger: true
  };

  confirm: PoModalAction = {
    action: () => {
      this.proccess();
    },
    label: 'Confirm'
  };

  constructor(
    private poNotification: PoNotificationService,
    private modalService: ModalService,
    public fb: FormBuilder

  ) {

  }
  ngOnInit(): void {
    //this VeiculoData
    this.veiculoForm = this.fb.group({
      vin: ['', Validators.required],
      odometer: ['', Validators.required],
      status: ['', Validators.required],
      tirePressure: ['', Validators.required],
      batteryStatus: ['', Validators.required],
      NiveldeCombustivel: ['', Validators.required],
      lat: ['', Validators.required],
      long: ['', Validators.required],
    });
  }


  closeModal() {
    this.veiculoForm.reset();
    this.poModal.close();
  }

  confirmVeiculo(id: number) {
    //1 para create
    //2 para update
    this.proccess();

    const body: any = {
      id: 123,
      vehicledata_vin: this.veiculoForm.value['vin'],
      vehicledata_odometer: this.veiculoForm.value['odometer'],
      vehicledata_tirePressure: this.veiculoForm.value['tirePressure'],
      vehicledata_status: this.veiculoForm.value['status'],
      vehicledata_batteryStatus: this.veiculoForm.value['batteryStatus'],
      vehicledata_fuelLevel: this.veiculoForm.value['NiveldeCombustivel'],
      vehicledata_lat: this.veiculoForm.value['lat'],
      vehicledata_long: this.veiculoForm.value['long']
    };

    console.log(body);
    if(id === 1){
      console.log('Passei');
      this.modalService.createVeiculo(body);
    } else {
      this.modalService.updateVeiculo(this.id, body);
    }
  }

  restore() {
    this.veiculoForm.reset();

  }

  private proccess() {
    if (this.veiculoForm.invalid) {
      const orderInvalidMessage = 'Fill the fields to confirm';
      this.poNotification.warning(orderInvalidMessage);
    } else {
      this.confirm.loading = true;

      setTimeout(() => {
        this.poNotification.success(`Post confirmed:`);
        this.confirm.loading = false;
        this.closeModal();
      }, 700);
    }
  }


        // //Buttons
        createVeiculo(modal: PoModalComponent){
          this.confirmOp = 1;
          this.veiculoForm.reset();
          this.poModal = modal;

          this.poModal.open();
        }

        editVeiculo(modal: PoModalComponent){
          this.confirmOp = 2;
          this.poModal = modal;
          this.fillFormField();
          this.poModal.open();
        }
        deleteVeiculo(){
          this.modalService.deleteCarro(this.id);
        }

        fillFormField(): void{
          this.modalService.getVeiculoDataById(this.id).subscribe(
            (retornoAPI) => { //[0]

              this.veiculoForm.setValue({
                'vin': retornoAPI.vehicledata_vin,
                'batteryStatus': retornoAPI.vehicledata_batteryStatus,
                'NiveldeCombustivel': retornoAPI.vehicledata_fuelLevel,
                'odometer': retornoAPI.vehicledata_odometer,
                'tirePressure': retornoAPI.vehicledata_tirePressure,
                'status': retornoAPI.vehicledata_status,
                'lat': retornoAPI.vehicledata_lat,
                'long': retornoAPI.vehicledata_long,
              });
            }
          )
        }
}
