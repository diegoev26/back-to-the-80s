import { ModalSize, ModalType } from "../_types/modal.types";
import { ApiResponse, FunctionResponse } from "@project/shared";

export interface ModalOptions {
  title: string;
  description?: string;
  type?: ModalType;
  size?: ModalSize;
  result?: ApiResponse | FunctionResponse;
  content?: ReactNode;
  confirmText?: string;
  isConfirmDisabled?: boolean;
  isLoading?: boolean;
}

export interface ModalContextType {
  openModal: (options: ModalOptions) => Promise<boolean>;
  closeModal: () => void;
}
