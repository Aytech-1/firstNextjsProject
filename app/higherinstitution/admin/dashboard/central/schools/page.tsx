'use client'
import tableStyles from "@/styles/component/table.module.css";
import styles from "@/styles/component/dashboard.module.css";
import { branchTableData } from "@/data/branch-table";
import Link from "next/link";
import Image from "next/image";
import {
    SquarePlus,
    GitBranchPlus,
    Users
} from "lucide-react";
const BranchPage = () => {
    return (
        <div className="w-full flex flex-col">

            <div className={styles.dashboardHeader}>
                <div className={styles.headerLeft}>

                    <div className={styles.headerIcon}>
                        <GitBranchPlus />
                    </div>

                    <div className={styles.headerText}>
                        <h2>Branches</h2>

                        <p>
                            View and manage all your branches from one dashboard.
                            Keep track of activities,  monitor updates,
                            and ensure everything runs smoothly across locations.
                        </p>
                    </div>

                </div>

                <div className={styles.staffHeader}>
                    <div className={styles.searchInput}>
                        <input className={styles.input}
                            type="text"
                            placeholder="Search Branch here..."
                        />

                    </div>

                    <div className={styles.addNew}>
                        <SquarePlus />
                        <Link href="/admin/dashboard/myprofile">ADD NEW BRANCH</Link>

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

                            <span>Branches</span>
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
                                    {branchTableData.map((branch) => (
                                        <tr key={branch.sn}>

                                            <td>{branch.sn}</td>
                                            <td>
                                                <div className={tableStyles.profileDiv}>

                                                    <div className={tableStyles.imageDiv}>
                                                        <Image
                                                            src={branch.image}
                                                            alt="avater"
                                                            width={40}
                                                            height={40}
                                                            className="rounded-2xl"
                                                        />
                                                    </div>

                                                    <div className={tableStyles.username}>
                                                        <h3>{branch.fullName}</h3>
                                                        <span>{branch.branchId}</span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className={tableStyles.info}>
                                                <h3>{branch.email}</h3>
                                                <span>{branch.phone}</span>
                                            </td>

                                            <td>
                                                <span>{branch.role}</span>
                                            </td>
                                            <td>
                                                <span>{branch.lastLogin}</span>
                                            </td>
                                            <td>
                                                <span
                                                    className={`
                                                    ${tableStyles.status}
                                                    ${branch.status.statusId === "1"
                                                            ? tableStyles.activeStatus
                                                            : tableStyles.inactiveStatus
                                                        }
                                                `}
                                                >
                                                    {branch.status.statusName}
                                                </span>
                                            </td>
                                            <td className={tableStyles.view}>
                                                <Link href={`/admin/dashboard/branch/${branch.branchId}`}>
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

export default BranchPage