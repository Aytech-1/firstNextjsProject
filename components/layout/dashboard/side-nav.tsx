'use client';

import styles from "@/styles/component/sidebar.module.css";
import { usePathname, useRouter } from "next/navigation";
import { sidebarItems } from "@/data/sidebar-item";
import Link from "next/link";
import { useModal } from "@/components/ui/modal-provider";

const Sidebar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { showModal } = useModal();

    const handleLogout = () => {
        showModal({
            variant: "success",
            title: "Confirm Logout",
            description:"Are you sure you want to log out of your account?",
            showCancelButton: true,
            cancelText: "No, Stay Logged In",
            confirmText: "Yes, Logout",
            onConfirm: () => {
                sessionStorage.clear();
                router.push("/central/admin/login");
            },
        });
    };

    return (
        <aside className="fixed bottom-0 w-32.5 bg-white z-10 h-[calc(100%-70px)]">
            <ul className="w-full h-full flex flex-col gap-5 items-center justify-start p-5">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.link;
                    if (item.name.toLowerCase() === "logout") {
                        return (
                            <li key={item.link} className="w-full">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className={styles.list}
                                >
                                    <item.icon size={19} />
                                    <span className={styles.span}>
                                        {item.name}
                                    </span>
                                </button>
                            </li>
                        );
                    }
                    return (
                        <li key={item.link} className="w-full">
                            <Link
                                href={item.link}
                                className={`${styles.list} ${
                                    isActive ? styles.active : ""
                                }`}
                            >
                                <item.icon size={19} />
                                <span className={styles.span}>
                                    {item.name}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;