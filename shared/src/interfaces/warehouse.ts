import type { FormsParam, ProductParam } from "./main";

export interface FormCarrier extends FormsParam {
  idCarrier: number;
}

export interface Printer {
  printerId: number;
  printerName: string;
  printerHost: string;
  port: number;
  location: string | null;
  idLocation: number | null;
}

export interface DnData extends FormsParam {
  numeroComprobanteCompleto: string;
  codigoCliente: string;
  nombreCliente: string;
  calleEntrega: string;
  numeroCalleEntrega: string;
  localidadEntrega?: string;
  totalBultos: number;
}

export interface LabelData
  extends FormsParam, Pick<DnData, "codigoCliente" | "nombreCliente"> {
  direccionL1: string;
  direccionL2: string;
  numeroGuia: string;
  operador: string;
  fechaRemito: string;
  numeroBulto: string;
  cantidadBultos: string;
  codigoBarras: string;
  pesoKg: number;
}

export interface ZplLabel {
  labelId: number;
  description: string;
  zplCode: string | null;
}

export interface DnToZebra extends FormsParam {
  idPrinter: Printer["printerId"];
  idLabel: ZplLabel["labelId"];
  labels: (number | string)[];
}

export interface ReprocessItem
  extends ProductParam, Pick<Printer, "printerId"> {
  impEAN: boolean;
  impQR: boolean;
  impPACK: boolean;
  q: number;
}

export interface DnPrinted
  extends Pick<Printer, "printerId">, Pick<ZplLabel, "labelId"> {
  data: (FormsParam & { packageNumber?: number })[];
  all: boolean;
}

export interface DispatcherDn extends FormsParam {
  deliveryNoteNumber: DnData["numeroComprobanteCompleto"];
  packageQuantity: string | number;
  clientName: DnData["nombreCliente"];
  addressL2: string;
}

export interface SLAData extends Pick<DnData, "nombreCliente"> {
  modforRX: FormsParam["modfor"];
  codforRX: FormsParam["codfor"];
  nroforRX: FormsParam["nrofor"];
  modforHR: FormsParam["modfor"];
  codforHR: FormsParam["codfor"];
  nroforHR: FormsParam["nrofor"];
  nroitmHR: number;
  nroCliente: DnData["codigoCliente"];
  fechaSalida: string;
  FechaEntregado: string;
  FechaRendido: string;
  bultos: number;
  estado: string;
  remitoEntregado: "S" | "N";
  remitoRendido: "S" | "N";
  transportista: string;
  pesoKg?: number;
  valorPesos?: number;
}
