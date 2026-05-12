'use client';

import styles from "@/styles/component/sidebar.module.css";
import { usePathname, useParams } from "next/navigation";
import { sidebarItems } from "@/data/sidebar-item";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const params = useParams();

  const schooltypeId = params.schooltypeId as string;

  return (
    <aside className="fixed bottom-0 w-32.5 bg-white z-10 h-[calc(100%-70px)]">
      <ul className="w-full h-full flex flex-col gap-5 items-center justify-start p-5">
        {sidebarItems.map((item) => {

          let isActive = pathname === item.link;

          if (item.name === "schools") {
            isActive = pathname === `/central/admin/dashboard/school/${schooltypeId}`;
          }

          return (
            <li key={item.link} className="w-full">
              <Link href={item.link} className={`${styles.list} ${
                  isActive ? styles.active : ""
                }`}
              >
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