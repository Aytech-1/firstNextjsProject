'use client'
import tableStyles from "@/styles/component/table.module.css";
import styles from "@/styles/component/dashboard.module.css";
import { DepartmentTableData } from "@/data/department-table";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "@/components/layout/campus/header";
import SideNav from "@/components/layout/campus/side-nav";
import {
    SquarePlus,
    GitBranchPlus,
    Users
} from "lucide-react";

const DepartmentPage = () => {
    const { schoolId, schooltypeId, campusId, departmentId } = useParams();
    return (
        <div className="relative w-full h-full overflow-hidden">
            <Image
                src="/all-images/bg-pix/adminbg.jpg"
                alt="background"
                fill
                className="object-cover"
                priority
            />
            <Header />
            <SideNav />
            <main className="w-[calc(100%-130px)] h-[calc(100%-70px)] absolute right-0 bottom-0 overflow-auto bg-white/50 backdrop-blur-md z-100">
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
                                <Link href={`/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/departent/adddepartment`}>ADD NEW DEPARMENT</Link>

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

                                    <span>Department</span>
                                </div>

                                <div className={tableStyles.tableContentDivInner}>
                                    <table className={tableStyles.table}>
                                        <thead>
                                            <tr>
                                                <th>SN</th>
                                                <th>Department Name</th>
                                                <th>Contact</th>
                                                <th>Status</th>
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {DepartmentTableData.map((department) => (
                                                <tr key={department.sn}>

                                                    <td>{department.sn}</td>
                                                    <td>
                                                        <div className={tableStyles.profileDiv}>

                                                            <div className={tableStyles.imageDiv}>
                                                                <Image
                                                                    src={department.image}
                                                                    alt="avater"
                                                                    width={40}
                                                                    height={40}
                                                                    className="rounded-2xl"
                                                                />
                                                            </div>

                                                            <div className={tableStyles.username}>
                                                                <h3>{department.departmentName}</h3>
                                                                <span>{department.departmentId}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className={tableStyles.info}>
                                                        <h3>{department.email}</h3>
                                                        <span>{department.phone}</span>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`
                                                        ${tableStyles.status}
                                                        ${department.status.statusId === "1"
                                                                    ? tableStyles.activeStatus
                                                                    : tableStyles.inactiveStatus
                                                                }
                                                    `}
                                                        >
                                                            {department.status.statusName}
                                                        </span>
                                                    </td>
                                                    <td className={tableStyles.view}>
                                                        <Link href={`/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}/department/${department.departmentId}`}>
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
            </main>
        </div >
    );
};

export default DepartmentPage