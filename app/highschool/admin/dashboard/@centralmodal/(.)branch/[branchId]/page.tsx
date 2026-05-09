'use client';

import styles from "@/styles/component/view-staff.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, UserCheck } from "lucide-react";
import Button from "@/components/ui/button";

const ViewStaffProfile = () => {
    const router = useRouter();

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.headerInner}>
                    <div className={styles.headerLeft}>
                        <div className="text-(--secondary-color)">
                            <UserCheck size={16} />
                        </div>
                        
                        <span>STAFF PROFILE</span>
                    </div>

                    <div className={styles.closeBtn} onClick={() => router.back()}>
                        <X size={14} />
                    </div>
                </div>
            </div>

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
                                <strong>2026-04-30</strong>
                            </div>
                        </div>

                    </div>
                </div>

                <div className={styles.formWrapper}>
                    <div className={styles.formInner}>

                        <div className="max-w-50 flex justify-end items-end">
                            <Button
                                id="update-btn"
                                text="UPDATE PROFILE"
                                type="button"
                            />
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewStaffProfile;