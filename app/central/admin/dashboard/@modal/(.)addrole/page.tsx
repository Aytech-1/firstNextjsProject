'use client';

import { useEffect, useState } from "react";
import { X, ShieldCheck, Check, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "@/styles/component/notice.module.css";
import InputField from "@/components/ui/text-field";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { GetSelectOptions } from "@/lib/preset-data";
import { SelectOption } from "@/types/ui";
import { useToast } from "@/components/ui/toast-provider";
import { getDeviceId } from "@/lib/device";
import { validateField } from "@/lib/validation";


const AddRoles = () => {
    const router = useRouter();
    const [roleName, setRoleName] = useState("");
    const [roleDescription, setRoleDescription] = useState("");
    const token = sessionStorage.getItem("accessToken");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

    const [permissionOptions, setPermissionOptions] = useState<SelectOption[]>([]);
    const [permissions, setPermissions] = useState<Record<number, boolean>>({});

    useEffect(() => {
        async function loadOptions() {
            try {
                const permissions = await GetSelectOptions("/central/permissions", "name", "id");
                setPermissionOptions(permissions);
                const initialPermissions = permissions.reduce((acc: Record<number, boolean>, permission: SelectOption) => {
                    acc[Number(permission.value)] = false;
                    return acc;
                }, {} as Record<number, boolean>);

                setPermissions(initialPermissions);

            } catch (error) {
                console.error("Error loading permissions:", error);
            }
        }
        loadOptions();
    }, []);

    const handleToggle = (id: number) => {
        setPermissions((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    async function addNewRole() {
        if (!roleName.trim()) {
            showToast("Role name is required", "error");
            return;
        }

        const selectedPermissions = Object.entries(permissions)
            .filter(([_, value]) => value)
            .map(([key]) => Number(key));

        if (selectedPermissions.length === 0) {
            showToast("Please select at least one permission!", "error");
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/central/role`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': APP_KEY ?? '',
                    'x-device-id': getDeviceId(),
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ roleName, permissions: selectedPermissions })
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                showToast(data.message)
                router.back()
            } else {
                showToast(data.message, "error");
            }

        } catch {
            showToast("An error occurred while logging in.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="absolute right-0 w-112.5 h-full bg-[#f8f8f8] animate__animated animate__fadeInRight">

            <div className="w-full px-4">
                <div className="w-full py-3 flex items-center justify-between border-b border-slate-200">
                    <div className="flex items-center justify-center gap-1">
                        <ShieldCheck className="text-(--border-color)" />

                        <h2
                            className="text-[12px] text-slate-700"
                            style={{ fontSize: 'clamp(20px, 4vw, 20px)' }}
                        >
                            Add New Role
                        </h2>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="text-slate-500 shadow-sm bg-slate-200 p-3 rounded-full cursor-pointer hover:text-slate-700 transition-colors duration-300"
                        title="close"
                    >
                        <X size={15} />
                    </button>
                </div>
            </div>

            <div className="w-full px-4 py-3 pb-15 overflow-auto h-[calc(100%-16px)]">

                <div className={styles.alert}>
                    Kindly fill the form below and toggle permissions to
                    <span> ADD NEW USER ROLE</span>
                </div>

                <div className="w-full mt-5 flex flex-col items-center gap-4">

                    <InputField
                        id="roleName"
                        label="Role Name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                    />

                    <Textarea
                        id="roleDescription"
                        label="Role Description"
                        className="h-32!"
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                    />

                    <div className={styles.group}>
                        <h3 className="text-[14px] text-slate-700 font-bold mb-2">
                            Permissions
                        </h3>

                        <p className="text-[12px] text-slate-500 mb-4">
                            Control system access by toggling specific permissions below.
                        </p>

                        <div className="flex flex-col justify-center items-center gap-3">

                            <div className={`${styles.group} bg-white! px-0!`}>

                                <div className="w-full px-5 pb-3.75">
                                    <h3 className="text-[15px] text-slate-500 font-bold">
                                        Dashboard Permissions
                                    </h3>
                                </div>

                                <div className="flex flex-col justify-center items-center">

                                    {permissionOptions.map((item) => (
                                        <div
                                            key={item.value}
                                            className={styles.toggle}
                                        >
                                            <span className="text-[13px] text-slate-600 font-medium">
                                                {item.label}
                                            </span>

                                            <label className={styles.switch}>
                                                <input
                                                    type="checkbox"
                                                    checked={permissions[Number(item.value)] || false}
                                                    onChange={() => handleToggle(Number(item.value))}
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
                                text={loading ? "PLEASE WAIT.." : "SUBMIT"}
                                type="button"
                                disabled={loading}
                                className="bg-black/70! w-2xl!"
                                rightIcon={loading ? <Loader className="animate-spin" /> : <Check size={15} />}
                                onClick={() => addNewRole()}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddRoles;