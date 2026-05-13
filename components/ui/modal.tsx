'use client';

import {
    Info,
    CheckCircle,
    AlertTriangle,
    XCircle,
    HelpCircle,
} from "lucide-react";
import { Modal } from "@/types/ui";
import styles from "@/styles/component/modal.module.css";

interface ModalProps {
    modal: Modal;
    onClose: () => void;
}

const ModalComponent = ({ modal, onClose }: ModalProps) => {
    const {
        variant,
        title,
        description,
        showCancelButton = false,
        cancelText = "Cancel",
        confirmText = "OK",
        onConfirm,
        onCancel,
    } = modal;

    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    const handleCancel = () => {
        onCancel?.();
        onClose();
    };

    const getIcon = () => {
        if (variant === "success") {
            return <CheckCircle size={32} />;
        }

        if (variant === "warning") {
            return <AlertTriangle size={32} />;
        }

        if (variant === "error") {
            return <XCircle size={32} />;
        }

        if (variant === "confirmation") {
            return <HelpCircle size={32} />;
        }

        return <Info size={32} />;
    };

    return (
        <div className={styles.modalWrapper}>
            <div className={styles.modalCard}>
                <div className={styles.modalContent}>
                    <div className={styles.titleSection}>
                        <div className={`${styles.iconCircle} ${styles[variant]}`}>
                            {getIcon()}
                        </div>

                        <h2 className={styles.title}>{title}</h2>
                    </div>

                    <p className={styles.description}>{description}</p>

                    <div className={styles.buttonGroup}>
                        {showCancelButton && (
                            <button
                                type="button"
                                className={`${styles.button} ${styles.cancelButton}`}
                                onClick={handleCancel}
                            >
                                {cancelText}
                            </button>
                        )}

                        <button
                            type="button"
                            className={`${styles.button} ${styles.confirmButton}`}
                            onClick={handleConfirm}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalComponent;