export interface BIFile {
  key: "seller" | "customer";
  customerKey: string;
  customerName: string;
  seller: string;
  path: string;
  filename: string;
}

export type BIFileRequest = Omit<BIFile, "customerName" | "seller">;
