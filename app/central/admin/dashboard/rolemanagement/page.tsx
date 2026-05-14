"use client";

import {
    Settings,
    UserPlus,
    Search,
    ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import style from "@/styles/component/dashboard.module.css";
import styles from "@/styles/component/settings.module.css";
import Button from "@/components/ui/button";


const Rolemanagement = () => {
    const router = useRouter();
    const roleData = [
        {
            id: 1,
            title: "Super Admin",
            description: "Full system access, including financial configurations, school onboarding, and high-level security logs.",
            userCount: 3,
            icon: ShieldCheck,
            link: "/central/admin/dashboard/roleprofile"
        },
        {
            id: 2,
            title: "Administrator",
            description: "Manages day-to-day operations, member approvals, and cooperative loan workflows without system-level access.",
            userCount: 12,
            icon: ShieldCheck,
            link: "/central/admin/dashboard/roleprofile"
        },
        {
            id: 3,
            title: "ICT Personnel",
            description: "Technical support access for managing student portals, database maintenance, and hardware integration.",
            userCount: 5,
            icon: ShieldCheck,
            link: "/central/admin/dashboard/roleprofile"
        }
    ];
    return (
        <div className="w-full flex flex-col justify-center-center gap-4">

            <div className={`${style.dashboardHeader} w-full`}>
                <div className={style.headerLeft}>
                    <div className={style.headerIcon}>
                        <Settings size={32} strokeWidth={1.5} />
                    </div>
                    <div className={style.headerText}>
                        <h2>Roles and Permissions</h2>
                        <p>
                            Define and manage user roles, permissions, and access controls to ensure secure and efficient system administration.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-2.5">
                    <div className="relative w-90">
                        <div className="border border-gray-300 gap-3 flex items-center px-4 py-3.75 bg-(--white-color) rounded-lg transition-all duration-300  focus-within:shadow-md ">
                            <Search className="bi-search text-[rgb(138,148,173)]" />
                            <input placeholder="Type here to search role.." className="outline-none w-full text-[15px] placeholder:text-[15px]" type="text" />
                        </div>
                    </div>

                    <div className="max-w-50 flex justify-end items-end">
                        <Button
                            id="role-btn"
                            text="ADD NEW ROLE"
                            leftIcon={<UserPlus size={18} />}
                            type="button"
                            onClick={() => router.push("/central/admin/dashboard/addrole")}
                        />
                    </div>

                </div>
            </div>

            <div className="w-full px-5 flex justify-center items-center">
                <div className={`${styles.bottom} shadow-sm`}>
                    <div className="flex flex-wrap gap-3 items-center justify-start">
                        {roleData.map((item) => (
                            <Link
                                key={item.id}
                                href={`${item.link}/${item.id}`}

                                className="group relative overflow-hidden flex flex-col gap-4 p-6 rounded-xl border border-slate-100 bg-slate-50/40 transition-all duration-300 cursor-pointer 
                            w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]
                            hover:bg-white hover:border-blue-400/50 hover:shadow-md"
                            >
                                <div className="absolute -bottom-2 -right-4 opacity-[0.03] text-blue-600 transition-all duration-500 group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-rotate-12">
                                    <item.icon size={80} />
                                </div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-blue-100 text-(--border-color) shadow-sm transition-transform group-hover:scale-105">
                                        <item.icon size={24} />
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="text-[20px] font-black text-slate-700 leading-none">
                                            {item.userCount}
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            Users
                                        </span>
                                    </div>
                                </div>

                                <div className="relative z-10 space-y-1">
                                    <h3 className="font-bold text-slate-800 text-lg leading-tight transition-colors duration-300 group-hover:text-(--border-color)">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rolemanagement
