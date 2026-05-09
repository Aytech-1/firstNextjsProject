'use client';
import styles from "@/styles/component/sidebar.module.css";
import { usePathname } from 'next/navigation';
import { useSchoolSidebarItems } from "@/data/school-sidebar-item";
import Link from "next/link";
const Sidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="fixed bottom-0  w-32.5 bg-white z-10 h-[calc(100%-70px)]">
            <ul className="w-full h-full flex flex-col gap-5 items-center justify-start p-5">
                {useSchoolSidebarItems().map((item) => {
                    const isActive = pathname === item.link;
                    return (
                        <li key={item.link} className="w-full">
                            <Link
                                href={item.link}
                                className={`${styles.list} ${isActive ? styles.active : ""}`}>
                                <item.icon size={19} />
                                <span className={`${styles.span}`}>{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
};

export default Sidebar;