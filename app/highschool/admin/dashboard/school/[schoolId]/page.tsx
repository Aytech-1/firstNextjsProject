
import styles from "@/styles/component/dashboard.module.css";
import { StatisticCardItem } from "@/data/statistic-card-item"
import Link from "next/link";
import {
    LayoutDashboard
 } from "lucide-react";

const Dashboard = () => {

  return (

    <div className="w-full flex flex-col gap-6">

      <div className={styles.dashboardHeader}>
        <div className={styles.headerLeft}>

          <div className={styles.headerIcon}>
          <LayoutDashboard/>
          </div>

          <div className={styles.headerText}>
            <h2>👋 Welcome Back, Adeyemi Ayobami!</h2>

            <p>
              Welcome to your dashboard, where you can oversee all your
              activities, tasks, progress, and updates—helping you stay
              organized and on track.
            </p>
          </div>

        </div>

        <div className="text-[12px] flex items-center gap-2.5 rounded-lg bg-(--white-color) py-3 px-2.5">
          <span>Last Login Date:</span>
          <strong>2026-04-30 10:45 AM</strong>
        </div>
      </div>

      <div className="w-full flex gap-4 p-5">
        {StatisticCardItem.map((item, index) => (

          <Link
            href={item.link}
            key={index}
            className={styles.statisticsCard}>
            <div className={styles.statisticsInner}>
              <div className={styles.statisticsText}>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
                <span className={styles.statisticsValue}>{item.value}</span>
              </div>

              <div className={`${styles.statisticsIcon} ${styles.primary}`}>
                <item.icon />
              </div>
            </div>
          </Link>
        )
        )}
      </div>
    </div >
  );
};

export default Dashboard;