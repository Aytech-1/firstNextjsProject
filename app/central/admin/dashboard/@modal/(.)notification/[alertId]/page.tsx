'use client';

import cardStyles from "@/styles/component/notification.module.css";
import { notifications } from "@/data/notification";
import { useRouter, useParams } from "next/navigation";

export default function AlertModal() {
    const router = useRouter();
    const params = useParams();

    const alertId = Number(params.alertId);

    const notification = notifications.find(
        (n) => n.alertId === alertId
    );

    if (!notification) {
        return (
            <div className={cardStyles.modal}>
                <p>Notification not found</p>
            </div>
        );
    }

    return (
        <div className={cardStyles.modalCenter}>
            <div className={cardStyles.modal}>
                <div className={cardStyles.centerHeader}>


                    <div className={cardStyles.modalHeader}>
                        <div className={cardStyles.avatar}>
                            {notification.name.charAt(0)}
                        </div>

                        <div className={cardStyles.userInfo}>
                            <h2>{notification.name}</h2>
                            <span>{notification.date}</span>
                        </div>
                    </div>

                    <div
                        className={cardStyles.closeBtn}
                        onClick={() => router.back()}
                    >
                        ×
                    </div>
                </div>
                <div className={cardStyles.modalBody}>
                    <div className={cardStyles.alertTag}>
                        System Notification
                    </div>


                    <div className={cardStyles.detailBox}>
                        <div className={cardStyles.detailLabel}>
                            Message
                        </div>
                        <div className={cardStyles.detailText}>
                            {notification.message}
                        </div>
                    </div>

                    <div className={cardStyles.detailBox}>
                        <div className={cardStyles.detailLabel}>
                            IP Address
                        </div>
                        <div className={cardStyles.detailText}>
                            {notification.ipAddress}
                        </div>
                    </div>

                    <div className={cardStyles.detailBox}>
                        <div className={cardStyles.detailLabel}>
                            Full Details
                        </div>
                        <div className={cardStyles.detailText}>
                            {notification.details}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}