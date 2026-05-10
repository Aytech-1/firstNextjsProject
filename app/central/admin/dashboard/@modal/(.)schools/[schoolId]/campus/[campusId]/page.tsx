'use client';

import styles from "@/styles/component/view-staff.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/button";
import Header from "@/components/layout/campus/header";
import SideNav from "@/components/layout/campus/side-nav";

const ViewCampusProfile = () => {
    const router = useRouter();

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
                <div>
                    <div className={styles.body}>
                        <div className={styles.topSection}>
                            <div className={styles.topInner}>

                                <div className={styles.image}>
                                    <Image
                                        src="/all-images/image-pix/avatar.jpg"
                                        alt="profile"
                                        width={70}
                                        height={70}
                                    />
                                </div>

                                <div className={styles.text}>
                                    <h2>MR ADEYEMI AYOBAMI SAMSON</h2>
                                    <div className={styles.meta}>
                                        <span className={`${styles.status} ${styles.active}`}>
                                            Status
                                        </span>
                                        <span>| LAST LOGIN</span>
                                        <strong>2026-04-38</strong>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className={styles.formWrapper}>
                            <div className={styles.formInner}>

                                <div className="max-w-50 flex flex-col justify-end items-end">
                                    <Button
                                        id="update-btn"
                                        text="CAMPUS DAHBAORD"
                                        type="button"
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div >
    );
};

export default ViewCampusProfile;