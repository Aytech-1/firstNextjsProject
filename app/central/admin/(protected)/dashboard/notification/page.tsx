'use client'
import tableStyles from "@/styles/component/table.module.css";
import styles from "@/styles/component/dashboard.module.css";
import cardStyles from "@/styles/component/notification.module.css";
import { schoolTableData } from "@/data/school-table";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    SquarePlus,
    GitBranchPlus,
    Users
} from "lucide-react";


import NotificationCard from "@/components/layout/dashboard/notificationcard";
import { notifications } from "@/data/notification";
import { link } from "fs";


const SchoolPage = () => {
    const { schooltypeId } = useParams();
    return (
        <div className="w-full flex flex-col">

            <div className={styles.dashboardHeader}>
                <div className={styles.headerLeft}>

                    <div className={styles.headerIcon}>
                        <GitBranchPlus />
                    </div>

                    <div className={styles.headerText}>
                        <h2>System Alert</h2>
                        <p>
                            View and manage all your system alerts from one dashboard.
                            Keep track of activities,  monitor updates,
                            and ensure everything runs smoothly across locations.
                        </p>
                    </div>

                </div>

                <div className={styles.staffHeader}>
                    <div className={styles.searchInput}>
                        <input className={styles.input}
                            type="text"
                            placeholder="Search School here..."
                        />

                    </div>

                    <div className={styles.addNew}>
                        <SquarePlus />
                        <Link href="/central/admin/dashboard/schools/addschool">ADD NEW SCHOOL</Link>

                    </div>

                </div>
            </div>

            <div className={tableStyles.dashboardWrapper}>
                <div className={tableStyles.dashboardWrapperInner}>

                    <div className={cardStyles.alertPage}>
                        <div className={cardStyles.filterBar}>
                            <span>Showing Notification for</span>
                            <select>
                                <option>Last 30 Days</option>
                            </select>
                        </div>

                        <div className={cardStyles.notificationHeader}>
                            Notification Between <span className={cardStyles.month}>July 19 2025 - August 19 2025</span>
                        </div>

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                                gap: "20px",
                            }}
                        >
                            
                            {notifications.map((item, index) => (
                                <Link href={`/central/admin/dashboard/notification/${item.alertId}`} key={index}>
                                    <NotificationCard {...item} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div >
    );
};

export default SchoolPage