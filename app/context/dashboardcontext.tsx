'use client';

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

import { LoadPresetData } from "@/lib/preset-data";
import { SelectOption } from "@/types/ui";
import { Staff } from "@/types/user";

interface DashboardContextType {
    titles: SelectOption[];
    genders: SelectOption[];
    countries: SelectOption[];
    roles: SelectOption[];
    statuses: SelectOption[];
    loading: boolean;
    staffList: Staff[];
    setStaffList: React.Dispatch<React.SetStateAction<Staff[]>>;
    getStaffById: (id: string) => Staff | null;
}

const DashboardContext = createContext<
    DashboardContextType | undefined
>(undefined);

export function DashboardProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [titles, setTitles] = useState<SelectOption[]>([]);
    const [genders, setGenders] = useState<SelectOption[]>([]);
    const [countries, setCountries] = useState<SelectOption[]>([]);
    const [roles, setRoles] = useState<SelectOption[]>([]);
    const [statuses, setStatuses] = useState<SelectOption[]>([]);

    const [staffList, setStaffList] = useState<Staff[]>([]);
    const getStaffById = (id: string) => staffList.find(s => s.staffId === id) ?? null;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await LoadPresetData();

                setTitles(data.titles);
                setGenders(data.genders);
                setCountries(data.countries);
                setRoles(data.roles);
                setStatuses(data.statuses);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                titles,
                genders,
                countries,
                roles,
                statuses,
                loading,
                staffList, 
                setStaffList, 
                getStaffById
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
}

export function useDashboard() {
    const context = useContext(DashboardContext);

    if (!context) {
        throw new Error(
            "useDashboard must be used within DashboardProvider"
        );
    }

    return context;
}