import type { ProductParam } from "./main";

export interface ListOpts {
  codlis: string;
  descrp: string;
  codcof: string;
  tiplis: string;
}

export interface ListHeader {
  codlis: ListOpts["codlis"];
  userid?: string;
  tiplis?: ListOpts["tiplis"];
}

export interface ListItems extends ProductParam {
  precio: number;
  vighas: string;
}

export interface LineData extends ProductParam, ListHeader {
  priceUpdate?: boolean;
  price?: string | number;
  dateUpdate?: boolean;
  date?: string;
}
