'use client';
import styles from "@/styles/component/sidebar.module.css";
import Link from "next/link";
import { usePathname, useParams, } from "next/navigation";
import { useSidebarItems } from "@/data/sidebar-item";
import { useModal } from "@/components/ui/modal-provider";
import { useToast } from "@/components/ui/toast-provider";
import { getDeviceId } from "@/lib/device";
import type { LucideIcon } from "lucide-react";
import { useUser } from "@/app/context/usercontext";

interface SidebarItem {
    name: string;
    link: string;
    icon: LucideIcon;
}

const Sidebar = () => {
    const pathname = usePathname();

    const { schooltypeId } = useParams<{ schooltypeId?: string }>();

    const { showModal } = useModal();
    const { showToast } = useToast();

    const sidebarItem = useSidebarItems() as SidebarItem[];

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;
    const { setUser, setToken, token } = useUser();

    async function logout(): Promise<void> {

        try {
            const response = await fetch(
                `${BASE_URL}/central/logout`,
                {
                    cache: "no-store",
                    method: "POST",

                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": APP_KEY ?? "",
                        Authorization: `Bearer ${token}`,
                        "x-device-id": getDeviceId(),
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                sessionStorage.removeItem("accessToken");
                setUser(null);
                setToken(null);
                window.location.href = "/central/admin/login";
            } else {
                showToast(data.message, "error");
            }
        } catch (error) {
            showToast(
                "An error occurred while logging out.",
                "error"
            );
        }
    }

    const handleLogout = (): void => {
        showModal({
            title: "Confirm Logout",
            description: "Are you sure you want to log out?",
            showCancelButton: true,
            cancelText: "No, Stay Logged In",
            confirmText: "Yes, Logout",
            onConfirm: async () => {
                await logout();
            },
        });
    };

    return (
        <aside className="fixed bottom-0 w-32.5 bg-white z-10 h-[calc(100%-70px)]">
            <ul className="w-full h-full flex flex-col gap-5 items-center justify-start p-5">
                {sidebarItem.map((item) => {
                    let isActive = pathname === item.link;

                    if (item.name.toLowerCase() === "schools" && schooltypeId) { isActive = pathname === `/central/admin/dashboard/school/${schooltypeId}`; }

                    // Logout button
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

                    // Normal navigation links
                    return (
                        <li key={item.link} className="w-full">
                            <Link href={item.link} className={`${styles.list} ${isActive ? styles.active : ""}`}>
                                <item.icon size={19} />

                                <span className={styles.span}>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;