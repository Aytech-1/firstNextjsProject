// 'use client'
// import tableStyles from "@/styles/component/table.module.css";
// import dashboardStyles from "@/styles/component/dashboard.module.css";
// import { adminTableData } from "@/data/table";
// import Link from "next/link";
// import Image from "next/image";
// import {
//     SquarePlus,
//     UserStar,
//     Users
// } from "lucide-react";

// const StaffPage = () => {
//     return (
//         <div className="w-full flex flex-col ">

//             <div className={dashboardStyles.dashboardHeader}>
//                 <div className={dashboardStyles.headerLeft}>

//                     <div className={dashboardStyles.headerIcon}>
//                         <UserStar />
//                     </div>

//                     <div className={dashboardStyles.headerText}>
//                         <h2>Administrators</h2>

//                         <p>
//                             Manage administrator accounts with eas.
//                             Assign roles, control access,
//                             and oversee activities to keep operations secure and well-organized.
//                         </p>
//                     </div>

//                 </div>

//                 <div className={dashboardStyles.staffHeader}>
//                     <div className={dashboardStyles.searchInput}>
//                         <input className={dashboardStyles.input}
//                             type="text"
//                             placeholder="Search Staff here..."
//                         />

//                     </div>

//                     <div className={dashboardStyles.addNew}>
//                         <SquarePlus />
//                         <Link href="/central/admin/dashboard/addstaff">ADD NEW STAFF</Link>

//                     </div>

//                 </div>


//             </div>


//             <div className={tableStyles.dashboardWrapper}>
//                 <div className={tableStyles.dashboardWrapperInner}>

//                     <div className={tableStyles.tableContentDiv}>
//                         {/* Table Header */}
//                         <div className={tableStyles.icon}>
//                             <span className="text-(--secondary-color)">
//                                 <Users size={18} />
//                             </span>
                            
//                             <span>Administrators</span>
//                         </div>

//                         <div className={tableStyles.tableContentDivInner}>
//                             <table className={tableStyles.table}>
//                                 <thead>
//                                     <tr>
//                                         <th>SN</th>
//                                         <th>User Name</th>
//                                         <th>Contact</th>
//                                         <th>Role</th>
//                                         <th>Last Login</th>
//                                         <th>Status</th>
//                                         <th>View</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {adminTableData.map((admin: any) => (
//                                         <tr key={admin.sn}>

//                                             <td>{admin.sn}</td>
//                                             <td>
//                                                 <div className={tableStyles.profileDiv}>

//                                                     <div className={tableStyles.imageDiv}>
//                                                         <Image
//                                                             src={admin.image}
//                                                             alt="avater"
//                                                             width={40}
//                                                             height={40}
//                                                             className="rounded-2xl"
//                                                         />
//                                                     </div>

//                                                     <div className={tableStyles.username}>
//                                                         <h3>{admin.fullName}</h3>
//                                                         <span>{admin.staffId}</span>
//                                                     </div>
//                                                 </div>
//                                             </td>

//                                             <td className={tableStyles.info}>
//                                                 <h3>{admin.email}</h3>
//                                                 <span>{admin.phone}</span>
//                                             </td>

//                                             <td>
//                                                 <span>{admin.role}</span>
//                                             </td>
//                                             <td>
//                                                 <span>{admin.lastLogin}</span>
//                                             </td>
//                                             <td>
//                                                 <span
//                                                     className={`
//                                                     ${tableStyles.status}
//                                                     ${admin.status.statusId === "1"
//                                                             ? tableStyles.activeStatus
//                                                             : tableStyles.inactiveStatus
//                                                         }
//                                                 `}
//                                                 >
//                                                     {admin.status.statusName}
//                                                 </span>
//                                             </td>
//                                             <td className={tableStyles.view}>
//                                                 <Link href={`/central/admin/dashboard/staff/${admin.staffId}`}>
//                                                 <span>VIEW</span>
//                                                 </Link>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>

//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div >
//     );
// };

// export default StaffPage;



'use client';

import tableStyles from "@/styles/component/table.module.css";
import dashboardStyles from "@/styles/component/dashboard.module.css";
import Link from "next/link";
import Image from "next/image";
import {
    SquarePlus,
    UserStar,
    Users
} from "lucide-react";
import { useState, useEffect } from "react";
import { getDeviceId } from "@/lib/device";
import { Staff } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY ?? "";


const StaffPage = () => {
const [staff, setStaff] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const token = sessionStorage.getItem("accessToken") ?? "";

        const fetchStaff = async () => {
            try {
                const response = await fetch(`${BASE_URL}/central/staff`, {
                    cache: "no-store",
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": APP_KEY,
                        "x-device-id": getDeviceId(),
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch staff");
                }

                const data = await response.json();
                setStaff(Array.isArray(data.data) ? data.data : []);

            } catch (err) {

                if (err instanceof Error) {
                    setError(err.message);
                }

            } finally {
                setLoading(false);
            }
        };

        fetchStaff();

    }, []);

    return (
        <div className="w-full flex flex-col">

            <div className={dashboardStyles.dashboardHeader}>

                <div className={dashboardStyles.headerLeft}>

                    <div className={dashboardStyles.headerIcon}>
                        <UserStar />
                    </div>

                    <div className={dashboardStyles.headerText}>
                        <h2>Administrators</h2>

                        <p>
                            Manage administrator accounts with ease.
                            Assign roles, control access,
                            and oversee activities to keep operations secure and organized.
                        </p>
                    </div>

                </div>

                <div className={dashboardStyles.staffHeader}>

                    <div className={dashboardStyles.searchInput}>
                        <input
                            className={dashboardStyles.input}
                            type="text"
                            placeholder="Search Staff here..."
                        />
                    </div>

                    <div className={dashboardStyles.addNew}>
                        <SquarePlus />

                        <Link href="/central/admin/dashboard/addstaff">
                            ADD NEW STAFF
                        </Link>
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

                                {loading && (
                                    <tbody>
                                        <tr>
                                            <td colSpan={7} className="text-center">
                                                Loading...
                                            </td>
                                        </tr>
                                    </tbody>
                                )}

                                {error && (
                                    <tbody>
                                        <tr>
                                            <td colSpan={7} className="text-center">
                                                Error: {error}
                                            </td>
                                        </tr>
                                    </tbody>
                                )}

                                {!loading && !error && staff.length === 0 && (
                                    <tbody>
                                        <tr>
                                            <td colSpan={7} className="text-center">
                                                No staff found.
                                            </td>
                                        </tr>
                                    </tbody>
                                )}

                                {!loading && !error && staff.length > 0 && (
                                    <tbody>

                                        {staff.map((admin, index) => (

                                            <tr key={admin.staffId}>

                                                <td>{index + 1}</td>

                                                <td>

                                                    <div className={tableStyles.profileDiv}>

                                                        <div className={tableStyles.imageDiv}>

                                                            <Image
                                                                src={"/avatar.png"}
                                                                alt="avatar"
                                                                width={40}
                                                                height={40}
                                                                className="rounded-2xl"
                                                            />

                                                        </div>

                                                        <div className={tableStyles.username}>
                                                            <h3>{admin.firstName}</h3>
                                                            <span>{admin.staffId}</span>
                                                        </div>

                                                    </div>

                                                </td>

                                                <td className={tableStyles.info}>
                                                    <h3>{admin.emailAddress}</h3>
                                                    <span>{admin.mobileNumber}</span>
                                                </td>

                                                <td>
                                                    <span>{admin.role?.roleName}</span>
                                                </td>

                                                <td>
                                                    <span>{admin.lastLoginAt}</span>
                                                </td>

                                                <td>

                                                    <span
                                                        className={`
                                                            ${tableStyles.status}
                                                            ${admin.status?.statusId === 1
                                                                ? tableStyles.activeStatus
                                                                : tableStyles.inactiveStatus
                                                            }
                                                        `}
                                                    >
                                                        {admin.status?.statusName}
                                                    </span>

                                                </td>

                                                <td className={tableStyles.view}>

                                                    <Link
                                                        href={`/central/admin/dashboard/staff/${admin.staffId}`}
                                                    >
                                                        <span>VIEW</span>
                                                    </Link>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>
                                )}

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default StaffPage;