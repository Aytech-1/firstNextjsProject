'use client';

import styles from "@/styles/component/view-staff.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, UserCheck } from "lucide-react";
import InputField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import { GetSelectOptions } from "@/lib/preset-data";
import { SelectOption } from "@/types/ui";
import { useUser } from "@/app/context/usercontext"

const ViewStaffProfile = () => {
    const router = useRouter();
    const { user } = useUser();

    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");

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


    useEffect(() => {
        async function loadOptions() {
            const [
                titles,
                genders,
                countries,
                states,
                lgas,
            ] = await Promise.all([
                GetSelectOptions("/setup/titles", "titleName", "titleId"),
                GetSelectOptions("/setup/genders", "genderName", "genderId"),
                GetSelectOptions(
                    "/setup/countries",
                    "countryName",
                    "countryId"
                ),
                GetSelectOptions(
                    countryId ? `/setup/states?countryId=${countryId}` : "",
                    "stateName",
                    "stateId",
                ),
                GetSelectOptions(
                    stateId ? `/setup/lga?stateId=${stateId}` : "",
                    "localGovernmentName",
                    "localGovernmentId"
                ),
            ]);

            setTitleOptions(titles);
            setGenderOptions(genders);
            setCountryOptions(countries);
            setStateOptions(states);
            setLgaOptions(lgas);
        }

        setFirstName(user?.firstName || "");
        setMiddleName(user?.middleName || "");
        setLastName(user?.lastName || "");
        setEmailAddress(user?.emailAddress || "");
        setMobileNumber(user?.mobileNumber || "");
        setDateOfBirth(user?.dateOfBirth || "");
        setTitleId(user?.title.titleId || null);
        setGenderId(user?.gender.genderId || null);

        loadOptions();
    }, [countryId, stateId]);

    const handleCountryChange = (value: number | null) => {
        setCountryId(value);
        setStateId(null);
        setLgaId(null);
    };

    const handleStateChange = (value: number | null) => {
        setStateId(value);
        setLgaId(null);
    }

    return (
        <div className={styles.container} >
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
                            <h2>{user?.title.titleName} {user?.firstName} {user?.middleName} {user?.lastName}</h2>
                            <div className={styles.meta}>
                                <span className={`${styles.status} ${styles.active}`}>
                                    Status
                                </span>
                                <span>| LAST LOGIN</span>
                                <strong>{user?.lastLoginAt}</strong>
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
                                        value={dateOfBirth}
                                        onChange={(e) => {setDateOfBirth(e.target.value)}}
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
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>STAFF ACCOUNT INFORMATION</h3>

                            <div className={styles.fieldGroup}>
                                <div className={styles.third}>
                                    <InputField
                                        id="state"
                                        label="State"
                                    // value={user?.state || ""}
                                    // onChange={(e) => setUser(userData ? { ...userData, state: e.target.value } : null)}
                                    />
                                </div>

                                <div className={styles.half}>
                                    <InputField
                                        id="lga"
                                        label="Local Govenment Area"
                                    />
                                </div>

                                <div className={styles.half}>
                                    <InputField
                                        id="address"
                                        label="Home Address"
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
                                        readOnly
                                        value={user?.staffId}
                                    />
                                </div>

                                <div className={styles.third}>
                                    <InputField
                                        id="createdTime"
                                        label="Created Time"
                                        readOnly
                                        value={user?.createdAt}
                                    />
                                </div>

                                <div className={styles.third}>
                                    <InputField
                                        id="lastLogin"
                                        label="Last Login"
                                        readOnly
                                        value={user?.lastLoginAt}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={styles.section}>
                            <h3 className={styles.sectionTitle}>ADMINISTRATIVE INFORMATION</h3>

                            <div className={styles.fieldGroup}>
                                <div className={styles.half}>
                                    <InputField
                                        id="role"
                                        label="Role"
                                        readOnly
                                        value={user?.role?.roleName}
                                        className="pointer-events-none"
                                    />
                                </div>

                                <div className={styles.half}>
                                    <InputField
                                        id="status"
                                        label="Status"
                                        readOnly
                                        value={user?.status?.statusName}
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
        </div>
    );
};

export default ViewStaffProfile;