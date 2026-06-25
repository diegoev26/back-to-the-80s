import type { WAStatus } from "../types/main.types";

export interface FormsParam {
  modfor: string;
  codfor: string;
  nrofor: string | number;
}

export interface ProductParam {
  tippro: string;
  artcod: string;
}

export type RawForm = Omit<FormsParam, "nrofor">;

export interface WASessionState {
  id: string;
  qr: string | null;
  isConnected: boolean;
  status: WAStatus;
  battery: number | null;
  plugged: boolean;
}
