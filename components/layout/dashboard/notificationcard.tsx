
import styles from "@/styles/component/notification.module.css";
import { NotificationCardProps } from "@/types/ui";

export default function NotificationCard({
  name,
  message,
  date,
}: NotificationCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h4>{name}</h4>
      </div>

      <p className={styles.message}>{message}</p>

      <span className={styles.date}>{date}</span>
    </div>
  );
}



