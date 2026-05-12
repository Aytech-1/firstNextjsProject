'use client';

import { createContext, useContext, useState } from "react";
import {
  Modal,
  ModalContextType,
} from "@/types/ui";
import ModalComponent from "./modal";

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider");
  }

  return context;
};

const defaultModal: Modal = {
  isOpen: false,
  variant: "info",
  title: "",
  description: "",
  showCancelButton: false,
  cancelText: "Cancel",
  confirmText: "OK",
};

const ModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [modal, setModal] = useState<Modal>(defaultModal);

  const showModal = (data: Partial<Modal>) => {
    setModal({
      ...defaultModal,
      ...data,
      isOpen: true,
    });
  };

  const closeModal = () => {
    setModal(defaultModal);
  };

  return (
    <ModalContext.Provider
      value={{
        showModal,
        closeModal,
      }}
    >
      {children}

      {modal.isOpen && (
        <ModalComponent
          modal={modal}
          onClose={closeModal}
        />
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;