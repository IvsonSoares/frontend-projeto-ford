export interface Veiculos extends Array<Veiculo> {}

export interface Veiculo {
  id: number
  vehicle_model: string
  vehicle_volumetotal: number
  vehicle_connected: number
  vehicle_softwareUpdates: number
}

export interface VeiculosAPI {
  veiculosData: VeiculosData;
}

export interface VeiculosData extends Array<VeiculoData>{}

export interface VeiculoData{
  _id: string
  id: number
  vehicledata_vin: string
  vehicledata_odometer: string
  vehicledata_tirePressure: string
  vehicledata_status: string
  vehicledata_batteryStatus: string
  vehicledata_fuelLevel: string
  vehicledata_lat: string
  vehicledata_long: string
}

