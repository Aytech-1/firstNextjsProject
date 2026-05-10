'use client'
import tableStyles from "@/styles/component/table.module.css";
import dashboardStyles from "@/styles/component/dashboard.module.css";
import { adminTableData } from "@/data/table";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "@/components/layout/school/header";
import SideNav from "@/components/layout/school/side-nav";
import {
    SquarePlus,
    UserStar,
    Users
} from "lucide-react";

const StaffPage = () => {
    const { schoolId } = useParams();
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
                <div className="w-full flex flex-col ">

                    <div className={dashboardStyles.dashboardHeader}>
                        <div className={dashboardStyles.headerLeft}>

                            <div className={dashboardStyles.headerIcon}>
                                <UserStar />
                            </div>

                            <div className={dashboardStyles.headerText}>
                                <h2>Administrators</h2>

                                <p>
                                    Manage administrator accounts with eas.
                                    Assign roles, control access,
                                    and oversee activities to keep operations secure and well-organized.
                                </p>
                            </div>

                        </div>

                        <div className={dashboardStyles.staffHeader}>
                            <div className={dashboardStyles.searchInput}>
                                <input className={dashboardStyles.input}
                                    type="text"
                                    placeholder="Search Staff here..."
                                />

                            </div>

                            <div className={dashboardStyles.addNew}>
                                <SquarePlus />
                                <Link href="/central/admin/dashboard/schools/${schoolId}/staff/addstaff">ADD NEW STAFF</Link>

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

                                    <span>Administrators</span>
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
                                            {adminTableData.map((admin) => (
                                                <tr key={admin.sn}>

                                                    <td>{admin.sn}</td>
                                                    <td>
                                                        <div className={tableStyles.profileDiv}>

                                                            <div className={tableStyles.imageDiv}>
                                                                <Image
                                                                    src={admin.image}
                                                                    alt="avater"
                                                                    width={40}
                                                                    height={40}
                                                                    className="rounded-2xl"
                                                                />
                                                            </div>

                                                            <div className={tableStyles.username}>
                                                                <h3>{admin.fullName}</h3>
                                                                <span>{admin.staffId}</span>
                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className={tableStyles.info}>
                                                        <h3>{admin.email}</h3>
                                                        <span>{admin.phone}</span>
                                                    </td>

                                                    <td>
                                                        <span>{admin.role}</span>
                                                    </td>
                                                    <td>
                                                        <span>{admin.lastLogin}</span>
                                                    </td>
                                                    <td>
                                                        <span
                                                            className={`
                                                    ${tableStyles.status}
                                                    ${admin.status.statusId === "1"
                                                                    ? tableStyles.activeStatus
                                                                    : tableStyles.inactiveStatus
                                                                }
                                                `}
                                                        >
                                                            {admin.status.statusName}
                                                        </span>
                                                    </td>
                                                    <td className={tableStyles.view}>
                                                        <Link href={`/central/admin/dashboard/schools/${schoolId}/staff/${admin.staffId}`}>
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

export default StaffPage;