export interface LayoutProps {
  children: React.ReactNode;
  modal?: React.ReactNode;
  schoolmodal?: React.ReactNode;
}

export interface TextFieldProps {
  id: string;
  type?: "text" | "password" | "email" | "number" | "date";
  readOnly?: boolean;
  label: string;
  maxLength?: number;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectFieldProps {
  id: string;
  label: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export interface ButtonProps {
  id: string;
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?: "primary" | "secondary";
}

export interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export type ToastType = "success" | "error" | "info";

export interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export type ModalVariant =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "confirmation";

export interface Modal {
  isOpen: boolean;
  variant: ModalVariant;
  title: string;
  description: string;
  showCancelButton?: boolean;
  cancelText?: string;
  confirmText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface ModalContextType {
  showModal: (modal: Partial<Modal>) => void;
  closeModal: () => void;
}



export type NotificationCardProps = {
  name: string;
  message: string;
  date: string;
};
