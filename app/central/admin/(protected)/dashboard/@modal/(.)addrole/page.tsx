'use client';
import { useState } from "react";
import { X, ShieldCheck, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "@/styles/component/notice.module.css";
import InputField from "@/components/ui/text-field";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";


const AddRoles = () => {
    const router = useRouter();

    const permissionList = [
        {
            id: 1,
            label: "Manage User Accounts",
        },
        {
            id: 2,
            label: "View Reports",
        },
        {
            id: 3,
            label: "Edit Finances",
        },
        {
            id: 4,
            label: "Manage Roles",
        },
        {
            id: 5,
            label: "Access Dashboard",
        },
    ]
  
    const initialPermissions = permissionList.reduce((acc, permission) => {
        acc[permission.id] = false;
        return acc;
    },
        {} as Record<number, boolean>
    );

    const [permissions, setPermissions] = useState<Record<number, boolean>>(initialPermissions);

    const handleToggle = (id: number) => {
        setPermissions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    return (
        <div className="absolute right-0 w-112.5 h-full bg-[#f8f8f8] animate__animated animate__fadeInRight">
            <div className="w-full px-4">
                <div className="w-full py-3 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center justify-center gap-1">
                        <ShieldCheck className="text-(--border-color)" />
                        <h2 className="text-[12px] text-slate-700" style={{ fontSize: 'clamp(20px, 4vw, 20px)' }}>Add New Role</h2>
                    </div>
                    <button onClick={() => router.back()} className="text-slate-500 shadow-sm bg-slate-200 p-3 rounded-full cursor-pointer hover:text-slate-700 transition-colors duration-300" title="close">
                        <X size={15} />
                    </button>
                </div>
            </div>

            <div className="w-full px-4 py-3 pb-15 overflow-auto h-[calc(100%-16px)]">
                <div className={styles.alert}>
                    Kindly fill the form below and toggle permissions to <span>ADD NEW USER ROLE</span>
                </div>

                <div className="w-full mt-5 flex flex-col items-center gap-4">
                    <InputField
                        id="roleName"
                        label="Role Name"
                        onChange={() => { }}
                    />

                    <Textarea
                        id="roleDescription"
                        label="Role Description"
                        className="h-32!"
                    />

                    <div className={styles.group}>
                        <h3 className="text-[14px] text-slate-700 font-bold mb-2">Permissions</h3>
                        <p className="text-[12px] text-slate-500 mb-4">Control system access by toggling specific permissions below. Assigning these rights carefully helps maintain a secure environment by ensuring users only interact with the data and features relevant to their specific department</p>
                        <div className="flex flex-col justify-center items-center gap-3">
                            <div className={`${styles.group} bg-white! px-0!`}>
                                <div className="w-full px-5 pb-3.75">
                                    <h3 className="text-[15px] text-slate-500 font-bold">Dashboard Permissions</h3>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    {permissionList.map((item) => (
                                        <div key={item.id} className={styles.toggle}>
                                            <span className="text-[13px] text-slate-600 font-medium">
                                                {item.label}
                                            </span>
                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={permissions[item.id]}
                                                    onChange={() => handleToggle(item.id)}
                                                />
                                                <span className={styles.slider}></span>

                                            </label>

                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start w-full">
                        <div className="flex justify-start w-35 items-start my-2">
                            <Button
                                id="create-btn"
                                text="SUBMIT"
                                type="button"
                                className="bg-black/70! w-2xl!"
                                rightIcon={<Check size={15} />}
                                onClick={() => console.log("Submit")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddRoles
