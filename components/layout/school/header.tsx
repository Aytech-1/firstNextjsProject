'use client';

import Image from "next/image"
import { X } from "lucide-react";
import styles from "@/styles/component/view-staff.module.css";
import { useRouter } from "next/navigation";
   

const Header = () => {
      const router = useRouter();
    return (
        <header className="w-full h-17.5 flex justify-center items-center bg-(--white-color) fixed top-0">
            <div className="w-[95%] h-full max-w-3000 flex justify-between items-center">

                <div className="w-100 flex  justify-between items-center">

                    <div className="w-37.5 overflow-hidden">
                        <Image
                            src="/all-images/image-pix/logo.png"
                            alt="logo"
                            width={150}
                            height={150}
                            loading="eager"
                            priority
                        />
                    </div>

                    <nav className="flex justify-center items-end gap-7.5  cursor-pointer">
                        <span className="text-(--secondary-color)">Dashboard</span>
                    </nav>

                </div>

                <div className={styles.closeBtn} onClick={() => router.back()}>
                        <X size={14} />
                    </div>

            </div>

        </header>
    )
}

export default Header