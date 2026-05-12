import {
    UserRoundCog as SettingIcon,
    OctagonAlert,
    ShieldCheck,
    CreditCard
} from "lucide-react";
import Link from "next/link";
import styles from "@/styles/component/settings.module.css";
import style from "@/styles/component/dashboard.module.css";

const Settings = () => {
    const managementData = [
        {
            title: " User Role Management",
            description: "Configure granular access controls, define custom permission sets, and establish administrative hierarchies for system governance.",
            icon: <ShieldCheck size={24} />,
            ghostIcon: <ShieldCheck size={80} />,
            link: "/central/admin/dashboard/rolemanagement"
        },
        {
            title: "Account Details",
            description: "Manage core profile credentials, institutional identity, and primary contact configurations for your administrative entity.",
            icon: <CreditCard size={24} />,
            ghostIcon: <CreditCard size={90} />,
            link: "/central/admin/dashboard/accountdetails"
        },
    ];
    return (
    <div className="w-full flex flex-col justify-center-center gap-4">

        <div className={`${style.dashboardHeader} w-full`}>
            <div className={style.headerLeft}>
                <div className={style.headerIcon}>
                    <SettingIcon size={32} strokeWidth={1.5} />
                </div>
                <div className={style.headerText}>
                    <h2>Global Configurations</h2>
                    <p>
                        View and  Manage and configure dashboard settings,global settings and manage users
                    </p>
                </div>
            </div>
            <button className={styles.btn} title="learn more">
                <OctagonAlert size={20} className="text-(--primary-color)" />
                <span>LEARN MORE</span>
            </button>
        </div>

        <div className="w-full px-5 flex justify-center items-center">
            <div className={`${styles.bottom} shadow-sm`}>
                <div className="flex flex-wrap gap-3 items-center justify-start">
                    {managementData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.link}
                            className="group relative overflow-hidden flex flex-col gap-4 p-6 rounded-xl border border-slate-100 bg-slate-50/40 transition-all duration-300 cursor-pointer 
                        w-[32.5%]
                        hover:bg-white hover:border-blue-400/50"
                        >
                            <div className={`absolute -bottom-2 -right-4 opacity-[0.03] text-blue-600 transition-all duration-500 group-hover:opacity-[0.07] group-hover:scale-110 group-hover:-rotate-12`}>
                                {item.ghostIcon}
                            </div>

                            <div className={`relative z-10 w-12 h-12 flex items-center justify-center rounded-tr-2xl rounded-bl-2xl bg-blue-100 text-(--border-color)`}>
                                {item.icon}
                            </div>
                            <div className="relative z-10 space-y-1">
                                <h3 className="font-bold text-slate-800 text-lg leading-tight transition-colors duration-300 group-hover:text-(--border-color)">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed max-w-[95%]">
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

export default Settings
