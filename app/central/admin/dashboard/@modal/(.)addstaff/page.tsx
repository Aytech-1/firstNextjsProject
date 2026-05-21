'use client';

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { UserPlus, X } from "lucide-react";
import InputField from "@/components/ui/text-field";
import SelectField from "@/components/ui/select-field";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { GetSelectOptions } from "@/lib/preset-data";
import { SelectOption } from "@/types/ui";

const AddStaffPage = () => {
    const router = useRouter();
    const { showToast } = useToast();

    const [titleId, setTitleId] = useState<number | null>(null);
    const [titleOptions, setTitleOptions] = useState<SelectOption[]>([]);

    const [genderId, setGenderId] = useState<number | null>(null);
    const [genderOptions, setGenderOptions] = useState<SelectOption[]>([]);

    const [roleId, setRoleId] = useState<number | null>(null);
    const [roleOptions, setRoleOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        async function loadOptions() {
            const [
                titles,
                genders,
                roles,
            ] = await Promise.all([
                GetSelectOptions("/setup/titles", "titleName", "titleId"),
                GetSelectOptions("/setup/genders", "genderName", "genderId"),
                GetSelectOptions("/central/role", "name", "id"),
            ]);

            setTitleOptions(titles);
            setGenderOptions(genders);
            setRoleOptions(roles);
        }

        loadOptions();
    }, []);

    return (
        <div className="absolute right-0 w-112.5 h-full bg-[#f8f8f8] animate__animated animate__fadeInRight">
            <div className="h-15 flex items-center justify-center bg-[rgba(250,245,229,0.5)]">
                <div className="w-[90%] flex items-center justify-between">
                    <div className="flex items-center gap-2 ">
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-linear-to-r from-[#9d043c] to-[#F5874F]">
                            <UserPlus size={16} className="text-white" />
                        </div>

                        <div className="text-[18px]  text-(--secondary-color)">
                            CREATE NEW STAFF
                        </div>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 px-3 py-2 rounded-full cursor-pointer text-white text-sm bg-linear-to-r from-[#9d043c] to-[#F5874F]"
                    >
                        <X size={18} /> Close
                    </button>
                </div>
            </div>

            <div className="absolute bottom-0 right-0 w-full h-[calc(100%-60px)] overflow-auto flex flex-col">
                <p className="px-5 py-3 text-sm text-(--link-color) bg-[rgba(250,245,229,0.5)] shadow">
                    You are about to create a new staff, please complete the form below
                </p>

                <div className="flex justify-center py-5 bg-[#f8f8f8]">
                    <div className="w-[90%]">
                        <div className="bg-white rounded shadow p-4 flex flex-col gap-5">

                            <div className="flex items-center gap-2 border-b pb-2">
                                <UserPlus size={18} className="text-(--primary-color2)" />
                                <span className="text-sm text-gray-500">
                                    Create new staff here
                                </span>
                            </div>

                            <div className="flex flex-col gap-5">

                                <SelectField
                                    id="title"
                                    label="Select Title"
                                    options={titleOptions}
                                    value={titleId}
                                    onChange={setTitleId}
                                />

                                <InputField
                                    id="firstName"
                                    label="First Name"
                                    onChange={() => { }}
                                />

                                <InputField
                                    id="middleName"
                                    label="Middle Name"
                                    onChange={() => { }}
                                />

                                <InputField
                                    id="lastName"
                                    label="Last Name"
                                    onChange={() => { }}
                                />

                                <InputField
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    onChange={() => { }}
                                />

                                <InputField
                                    id="phone"
                                    label="Phone Number"
                                    onChange={() => { }}
                                />
                                <InputField
                                    id="address"
                                    label="Home Address"
                                    onChange={() => { }}
                                />

                                <SelectField
                                    id="gender"
                                    label="Select Gender"
                                    options={genderOptions}
                                    value={genderId}
                                    onChange={setGenderId}
                                />

                                <div className="bg-[rgba(46,204,113,0.05)] p-4 border border-[rgba(46,204,113,0.4)] rounded flex flex-col gap-4">
                                    <span className="text-(--secondary-color) text-[12px] font-semibold">
                                        ADMINISTRATIVE INFORMATION
                                    </span>

                                    <SelectField
                                        id="role"
                                        label="Select Role"
                                        options={roleOptions}
                                        value={roleId}
                                        onChange={setRoleId}
                                    />
                                </div>

                                <div className="flex justify-center mt-2">
                                    <Button
                                        id="create-btn"
                                        text="SUBMIT"
                                        type="button"
                                        onClick={() => console.log("Submit")}
                                    />

                                    <Button
                                        id="toast-btn"
                                        text="SHOW TOAST"
                                        type="button"
                                        onClick={() => showToast("Staff created successfully")}
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStaffPage;