'use client';

import styles from "@/styles/component/view-staff.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, UserCheck } from "lucide-react";
import InputField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import Button from "@/components/ui/button";
import { useParams } from "next/navigation";
import { GetSelectOptions } from "@/lib/preset-data";
import { getDeviceId } from "@/lib/device";
import { useEffect, useState } from "react";
import { SelectOption } from "@/types/ui";
import { Staff } from "@/types/user";
import { Loader } from "lucide-react";

const ViewStaffProfile = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY ?? "";
    const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : null;
    const router = useRouter();
    const { staffId } = useParams();
    const [staff, setStaff] = useState<Staff | null>(null);
    const [loading, setLoading] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [homeAddress, setHomeAddress] = useState("");

    const [titleId, setTitleId] = useState<number | null>(null);
    const [titleOptions, setTitleOptions] = useState<SelectOption[]>([]);

    const [genderId, setGenderId] = useState<number | null>(null);
    const [genderOptions, setGenderOptions] = useState<SelectOption[]>([]);

    const [countryId, setCountryId] = useState<number | null>(null);
    const [countryOptions, setCountryOptions] = useState<SelectOption[]>([]);

    const [stateId, setStateId] = useState<number | null>(null);
    const [stateOptions, setStateOptions] = useState<SelectOption[]>([]);

    const [lgaId, setLgaId] = useState<number | null>(null);
    const [lgaOptions, setLgaOptions] = useState<SelectOption[]>([]);

    const [roleId, setRoleId] = useState<number | null>(null);
    const [roleOptions, setRoleOptions] = useState<SelectOption[]>([]);

    const [statusId, setStatusId] = useState<number | null>(null);
    const [statusOptions, setStatusOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        async function fetchAll() {
            try {
                setLoading(true);
                
                const [
                    staffRes,
                    titles,
                    genders,
                    countries,
                    roles,
                    statuses,
                ] = await Promise.all([
                    fetch(`${BASE_URL}/central/staff/${staffId}`, {
                        cache: "no-store",
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "x-api-key": APP_KEY,
                            "x-device-id": getDeviceId(),
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    GetSelectOptions("/setup/titles", "titleName", "titleId"),
                    GetSelectOptions("/setup/genders", "genderName", "genderId"),
                    GetSelectOptions("/setup/countries", "countryName", "countryId"),
                    GetSelectOptions("/central/role", "roleName", "roleId"),
                    GetSelectOptions(
                        "/setup/statuses?statusId[]=1&statusId[]=2",
                        "statusName",
                        "statusId"
                    ),
                ]);

                const data = await staffRes.json();
                const staffData = data?.data || null;

                setStaff(staffData);

                setFirstName(staffData?.firstName || "");
                setMiddleName(staffData?.middleName || "");
                setLastName(staffData?.lastName || "");
                setEmailAddress(staffData?.emailAddress || "");
                setMobileNumber(staffData?.mobileNumber || "");
                setDateOfBirth(staffData?.dateOfBirth || "");
                setHomeAddress(staffData?.homeAddress || "");

                setTitleId(staffData?.title?.titleId || null);
                setGenderId(staffData?.gender?.genderId || null);
                setCountryId(staffData?.location?.countryId || null);
                setStateId(staffData?.location?.stateId || null);
                setLgaId(staffData?.location?.lgaId || null);
                setRoleId(staffData?.role?.roleId || null);
                setStatusId(staffData?.status?.statusId || null);

                setTitleOptions(titles);
                setGenderOptions(genders);
                setCountryOptions(countries);
                setRoleOptions(roles);
                setStatusOptions(statuses);

                const fetchedCountryId = staffData?.location?.countryId;
                const fetchedStateId = staffData?.location?.stateId;

                if (fetchedCountryId && fetchedStateId) {
                    const [states, lgas] = await Promise.all([
                        GetSelectOptions(
                            `/setup/states?countryId=${fetchedCountryId}`,
                            "stateName",
                            "stateId"
                        ),
                        GetSelectOptions(
                            `/setup/lga?stateId=${fetchedStateId}`,
                            "localGovernmentName",
                            "localGovernmentId"
                        ),
                    ]);

                    setStateOptions(states);
                    setLgaOptions(lgas);
                } else if (fetchedCountryId) {
                    const states = await GetSelectOptions(
                        `/setup/states?countryId=${fetchedCountryId}`,
                        "stateName",
                        "stateId"
                    );

                    setStateOptions(states);
                }
            } catch {
            } finally {
                setLoading(false);
            }
        }

        if (staffId) {
            fetchAll();
        }
    }, [staffId]);

    const handleCountryChange = async (value: number | null) => {
        setCountryId(value);
        setStateId(null);
        setLgaId(null);
        setStateOptions([]);
        setLgaOptions([]);

        if (value) {
            try {
                const states = await GetSelectOptions(
                    `/setup/states?countryId=${value}`,
                    "stateName",
                    "stateId"
                );
                setStateOptions(states);
            } catch (error) {
            }
        }
    };

    const handleStateChange = async (value: number | null) => {
        setStateId(value);
        setLgaId(null);
        setLgaOptions([]);

        if (value) {
            try {
                const lgas = await GetSelectOptions(
                    `/setup/lga?stateId=${value}`,
                    "localGovernmentName",
                    "localGovernmentId"
                );
                setLgaOptions(lgas);
            } catch (error) {
            }
        }
    };

    return (
        <div className={styles.container}>
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

            {
                loading ? (
                    <div className="w-full h-50 flex justify-center items-center">
                        <Loader className="animate-spin" /> Loading staff profile...
                    </div>
                ) : (
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
                                    <h2>
                                        {staff?.title?.titleName} {staff?.firstName}{" "}
                                        {staff?.middleName} {staff?.lastName}
                                    </h2>
                                    <div className={styles.meta}>
                                        <span className={`${styles.status} ${styles.active}`}>
                                            Status
                                        </span>
                                        <span>| LAST LOGIN</span>
                                        <strong>{staff?.lastLoginAt || "N/A"}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.formWrapper}>
                            <div className={styles.formInner}>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>STAFF BASIC INFORMATION</h3>

                                    <div className={styles.fieldGroup}>
                                        <div className={styles.half}>
                                            <SelectField
                                                id="title"
                                                label="Select Title"
                                                options={titleOptions}
                                                value={titleId}
                                                onChange={setTitleId}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="firstName"
                                                label="First Name"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="middleName"
                                                label="Middle Name"
                                                value={middleName}
                                                onChange={(e) => setMiddleName(e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="lastName"
                                                label="Last Name"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <SelectField
                                                id="gender"
                                                label="Select Gender"
                                                options={genderOptions}
                                                value={genderId}
                                                onChange={setGenderId}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="phone"
                                                label="Phone Number"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="email"
                                                label="Email Address"
                                                type="email"
                                                value={emailAddress}
                                                onChange={(e) => setEmailAddress(e.target.value)}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="dob"
                                                label="Date Of Birth"
                                                type="date"
                                                value={dateOfBirth}
                                                onChange={(e) => setDateOfBirth(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>STAFF RESIDENT INFORMATION</h3>

                                    <div className={styles.fieldGroup}>
                                        <div className={styles.half}>
                                            <SelectField
                                                id="country"
                                                label="Select Country"
                                                options={countryOptions}
                                                value={countryId}
                                                onChange={handleCountryChange}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <SelectField
                                                id="state"
                                                label="Select State"
                                                options={stateOptions}
                                                value={stateId}
                                                onChange={handleStateChange}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <SelectField
                                                id="lga"
                                                label="Select Local Government Area"
                                                options={lgaOptions}
                                                value={lgaId}
                                                onChange={setLgaId}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <InputField
                                                id="address"
                                                label="Home Address"
                                                value={homeAddress}
                                                onChange={(e) => setHomeAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>STAFF ACCOUNT INFORMATION</h3>

                                    <div className={styles.fieldGroup}>
                                        <div className={styles.third}>
                                            <InputField
                                                id="staffId"
                                                label="Staff ID"
                                                value={staff?.staffId || ""}
                                                readOnly
                                            />
                                        </div>

                                        <div className={styles.third}>
                                            <InputField
                                                id="createdTime"
                                                label="Created Time"
                                                value={staff?.createdAt || ""}
                                                readOnly
                                            />
                                        </div>

                                        <div className={styles.third}>
                                            <InputField
                                                id="lastLogin"
                                                label="Last Login"
                                                value={staff?.lastLoginAt || ""}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.section}>
                                    <h3 className={styles.sectionTitle}>ADMINISTRATIVE INFORMATION</h3>

                                    <div className={styles.fieldGroup}>
                                        <div className={styles.half}>
                                            <SelectField
                                                id="role"
                                                label="Select Role"
                                                options={roleOptions}
                                                value={roleId}
                                                onChange={setRoleId}
                                            />
                                        </div>

                                        <div className={styles.half}>
                                            <SelectField
                                                id="status"
                                                label="Select Status"
                                                options={statusOptions}
                                                value={statusId}
                                                onChange={setStatusId}
                                            />
                                        </div>
                                    </div>
                                </div>

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
                )
            }
        </div>
    );
};

export default ViewStaffProfile;