'use client'
import tableStyles from "@/styles/component/table.module.css";
import styles from "@/styles/component/dashboard.module.css";
import { schoolTableData } from "@/data/school-table";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
    SquarePlus,
    GitBranchPlus,
    Users
} from "lucide-react";
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
                        <h2>Schools</h2>

                        <p>
                            View and manage all your schools from one dashboard.
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

                    <div className={tableStyles.tableContentDiv}>
                        <div className={tableStyles.icon}>
                            <span className="text-(--secondary-color)">
                                <Users size={18} />
                            </span>

                            <span>Schools</span>
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
                                    {schoolTableData.map((school) => (
                                        <tr key={school.sn}>

                                            <td>{school.sn}</td>
                                            <td>
                                                <div className={tableStyles.profileDiv}>

                                                    <div className={tableStyles.imageDiv}>
                                                        <Image
                                                            src={school.image}
                                                            alt="avater"
                                                            width={40}
                                                            height={40}
                                                            className="rounded-2xl"
                                                        />
                                                    </div>

                                                    <div className={tableStyles.username}>
                                                        <h3>{school.fullName}</h3>
                                                        <span>{school.schoolId}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={tableStyles.info}>
                                                <h3>{school.email}</h3>
                                                <span>{school.phone}</span>
                                            </td>

                                            <td>
                                                <span>{school.role}</span>
                                            </td>
                                            <td>
                                                <span>{school.lastLogin}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`
                                                    ${tableStyles.status}
                                                    ${school.status.statusId === "1"
                                                            ? tableStyles.activeStatus
                                                            : tableStyles.inactiveStatus
                                                        }
                                                `}
                                                >
                                                    {school.status.statusName}
                                                </span>
                                            </td>
                                            <td className={tableStyles.view}>
                                                <Link href={`/central/admin/dashboard/schools/${schooltypeId}/${school.schoolId}`}>
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

export default SchoolPage