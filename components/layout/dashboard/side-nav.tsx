'use client';

import { useEffect, useState } from "react";
import styles from "@/styles/component/sidebar.module.css";
import { usePathname, useRouter, useParams } from "next/navigation";
import { sidebarItems } from "@/data/sidebar-item";
import Link from "next/link";
import { useModal } from "@/components/ui/modal-provider";
import { useToast } from "@/components/ui/toast-provider";
import { getDeviceId } from "@/lib/device";
import type { LucideIcon } from "lucide-react";   

// Define the shape of one sidebar item
interface SidebarItem {
    name: string;
    link: string;
    icon: LucideIcon;
    show?: boolean;
}

const Sidebar = () => {
    const pathname = usePathname();
    const { schooltypeId } = useParams<{ schooltypeId?: string }>();
    const router = useRouter();
    const { showModal } = useModal();
    const { showToast } = useToast();

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

    // Type-safe state
    const [sidebarItem, setSidebarItem] = useState<SidebarItem[]>([]);

    // Load sidebar items only in the browser after hydration
    useEffect(() => {
        const items = sidebarItems() as SidebarItem[];
        setSidebarItem(items);
    }, []);

    async function logout(): Promise<void> {
        const token = sessionStorage.getItem("accessToken");

        try {
            const response = await fetch(`${BASE_URL}/central/logout`, {
                cache: "no-store",
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "x-api-key": APP_KEY ?? "",
                    Authorization: `Bearer ${token}`,
                    "x-device-id": getDeviceId(),
                },
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                sessionStorage.clear();
                window.location.href = "/central/admin/login"; // Use full page reload to ensure all state is cleared
            } else {
                showToast(data.message, "error");
            }
        } catch (error) {
            showToast("An error occurred while logging out.", "error");
        }
    }

    const handleLogout = (): void => {
        showModal({
            variant: "success",
            title: "Confirm Logout",
            description: "Are you sure you want to log out of your account?",
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

                    if (item.name.toLowerCase() === "schools" && schooltypeId) {
                        isActive =
                            pathname ===
                            `/central/admin/dashboard/school/${schooltypeId}`;
                    }

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