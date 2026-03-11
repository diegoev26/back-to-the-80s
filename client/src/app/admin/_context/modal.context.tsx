"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import {
  ModalContextType,
  ModalOptions,
} from "../_interfaces/modal.interfaces";
import Modal from "../_components/ui/Modal";

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);
  const resolverRef = useRef<(value: boolean) => void>(() => {});

  const openModal = (opts: ModalOptions): Promise<boolean> => {
    setOptions(opts);
    setIsOpen(true);
    return new Promise((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const closeModal = () => {
    if (options?.onClose) {
      options.onClose();
    }

    setIsOpen(false);
    resolverRef.current(false);
  };

  const confirm = useCallback(() => {
    if (!(options?.type === "form" || options?.type === "action"))
      setIsOpen(false);

    resolverRef.current(true);
  }, [options]);

  const updateOptions = useCallback((opts: Partial<ModalOptions>) => {
    setOptions((prev: ModalOptions) => {
      if (!prev) return null;

      const next = { ...prev, ...opts };
      if (
        prev?.isConfirmDisabled === next?.isConfirmDisabled &&
        prev?.isLoading === next?.isLoading
      )
        return prev;

      return next;
    });
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, updateOptions }}>
      {children}
      {isOpen && options && (
        <Modal options={options} onClose={closeModal} onConfirm={confirm} />
      )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal debe usarse dentro de ModalProvider");
  return context;
};
