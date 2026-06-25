export interface TaxesAmount {
  account: string;
  jurisdiction: string;
  orderAmount: number;
  orderIVA: number;
}

export interface ShippingData {
  amount: number;
  carrier: string;
  orderCode: string;
  orderId: number;
  postalCode: string;
}
