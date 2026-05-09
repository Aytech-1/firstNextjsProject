'use client'
import tableStyles from "@/styles/component/table.module.css";
import styles from "@/styles/component/dashboard.module.css";
import { CampusTableData } from "@/data/campus-table";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    SquarePlus,
    GitBranchPlus,
    Users
} from "lucide-react";
const CampusPage = () => {
    const {schoolId } = useParams();
    return (
        <div className="w-full flex flex-col">

            <div className={styles.dashboardHeader}>
                <div className={styles.headerLeft}>

                    <div className={styles.headerIcon}>
                        <GitBranchPlus />
                    </div>

                    <div className={styles.headerText}>
                        <h2>Campuses</h2>

                        <p>
                            View and manage all your campuses from one dashboard.
                            Keep track of activities,  monitor updates,
                            and ensure everything runs smoothly across locations.
                        </p>
                    </div>

                </div>

                <div className={styles.staffHeader}>
                    <div className={styles.searchInput}>
                        <input className={styles.input}
                            type="text"
                            placeholder="Search Campus here..."
                        />

                    </div>

                    <div className={styles.addNew}>
                        <SquarePlus />
                        <Link href={`/central/admin/dashboard/schools/${schoolId}/campus/addcampus`}>ADD NEW CAMPUS</Link>

                    </div>

                </div>
            </div>

            <div className={tableStyles.dashboardWrapper}>
                <div className={tableStyles.dashboardWrapperInner}>

                    <div className={tableStyles.tableContentDiv}>
                        {/* Table Header */}
                        <div className={tableStyles.icon}>
                            <span className="text-(--secondary-color)">
                                <Users size={18} />
                            </span>

                            <span>Campuses</span>
                        </div>

                        <div className={tableStyles.tableContentDivInner}>
                            <table className={tableStyles.table}>
                                <thead>
                                    <tr>
                                        <th>SN</th>
                                        <th>User Name</th>
                                        <th>Contact</th>
                                        <th>Role</th>
                                        <th>Last Login</th>
                                        <th>Status</th>
                                        <th>View</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CampusTableData.map((campus) => (
                                        <tr key={campus.sn}>

                                            <td>{campus.sn}</td>
                                            <td>
                                                <div className={tableStyles.profileDiv}>

                                                    <div className={tableStyles.imageDiv}>
                                                        <Image
                                                            src={campus.image}
                                                            alt="avater"
                                                            width={40}
                                                            height={40}
                                                            className="rounded-2xl"
                                                        />
                                                    </div>

                                                    <div className={tableStyles.username}>
                                                        <h3>{campus.fullName}</h3>
                                                        <span>{campus.campusId}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={tableStyles.info}>
                                                <h3>{campus.email}</h3>
                                                <span>{campus.phone}</span>
                                            </td>

                                            <td>
                                                <span>{campus.role}</span>
                                            </td>
                                            <td>
                                                <span>{campus.lastLogin}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`
                                                    ${tableStyles.status}
                                                    ${campus.status.statusId === "1"
                                                            ? tableStyles.activeStatus
                                                            : tableStyles.inactiveStatus
                                                        }
                                                `}
                                                >
                                                    {campus.status.statusName}
                                                </span>
                                            </td>
                                            <td className={tableStyles.view}>
                                                <Link href={`/central/admin/dashboard/schools/${campus.campusId}`}>
                                                    <span>VIEW</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
};

export default CampusPage