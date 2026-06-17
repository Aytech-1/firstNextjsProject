import { getDeviceId } from "@/lib/device";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY ?? "";
const token = typeof window !== "undefined" ? sessionStorage.getItem("accessToken") : "";

export async function GetPresetData(endpoint: string) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        cache: "no-store",
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-api-key": APP_KEY,
            "x-device-id": getDeviceId(),
            Authorization: `Bearer ${token}`,
        },
    });

    const data = await response.json();

    return Array.isArray(data.data) ? data.data : [];
}

export async function GetSelectOptions(
    endpoint: string,
    labelKey: string,
    valueKey: string,
) {
    const data = await GetPresetData(endpoint);

    return data.map((item: any) => ({
        label: item[labelKey],
        value: item[valueKey],
    }));
}

export async function LoadPresetData() {
    const [
        titles,
        genders,
        countries,
        roles,
        statuses
    ] = await Promise.all([
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

    return {
        titles,
        genders,
        countries,
        roles,
        statuses
    };
}