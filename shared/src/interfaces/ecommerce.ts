export interface OrderId {
  identi: string;
}

export interface OrderTaxes extends OrderId {
  taxCondition: string;
}

export interface OrderTaxesAmount extends OrderId {
  items: {
    key: string;
    amount: number;
  }[];
}

export interface OrderTaxesPayment extends OrderId {
  paymentCode: number | string;
  paymentComments?: string;
}

export interface OrderContactData extends OrderId {
  mail?: string;
  phone?: string | number;
  dirent?: string;
  codent?: string;
  dirtxt?: string;
}

export interface OrderContactDataDelete extends OrderId {
  mail?: boolean;
  phone?: boolean;
}

export interface OrderResetDelete extends OrderId {
  action: "reset" | "borrar";
}

export interface OrderComment extends OrderId {
  comment: string;
}

export interface OrdersSettings {
  stock: boolean;
}

export interface OrderStep extends OrderId {
  step: number | string;
}
