'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getDeviceId } from "@/lib/device";
import { Staff } from "@/types/user";

interface UserContextType {
    user: Staff | null;
    token: string | null;
    hasPermission: (permission: string) => boolean;
    setUser: React.Dispatch<React.SetStateAction<Staff | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY ?? "";

export function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<Staff | null>(null);
    const hasPermission = (permission: string) => {
    return user?.role.permissions.includes(permission) ?? false;
  };

    const refreshUser = async () => {
        try {
            const savedToken = sessionStorage.getItem("accessToken");

            if (!savedToken) {
                setUser(null);
                setToken(null);
                return;
            }

            const response = await fetch(
                `${BASE_URL}/central/fetch-profile`,
                {
                    cache: "no-store",
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        "x-api-key": APP_KEY,
                        "x-device-id": getDeviceId(),
                        Authorization: `Bearer ${savedToken}`,
                    },
                }
            );

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = await response.json();
            setUser(data.data ?? data);
            setToken(savedToken);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setUser(null);
            setToken(null);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                hasPermission,
                setUser,
                setToken,
                refreshUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error(
            "useUser must be used within a UserProvider"
        );
    }

    return context;
}