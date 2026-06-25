export interface DeliveryData {
  CDENT1: string;
  DESCRP: string;
}

export interface SaleType {
  id: string;
  descrp: string;
}

export interface HeaderSaleResponse {
  delivery?: DeliveryData[];
  saleType?: SaleType[];
}

export interface Carrier {
  value: string;
  label: string;
}

export interface SaleRow {
  NROITM: number;
  MODFOR: string;
  CODFOR: string;
  FEC_ENTREGA: string;
  HabEncabezado: boolean;
  [key: string]: any;
}

export interface SaleUpdate {
  textos: string;
  fchhas: string;
  tracod: string;
  pedesp: boolean;
  obra: boolean;
  cdentr: string;
  matcon: string;
}

export interface SaleUpdateRequest extends SaleUpdate {
  userid: string;
  modfor: string;
  codfor: string;
  nrofor: number;
  nroitm: number | number[];
}
