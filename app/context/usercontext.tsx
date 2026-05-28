'use client';

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getDeviceId } from "@/lib/device";
import { Staff } from "@/types/user";
import { useModal } from "@/components/ui/modal-provider";

interface UserContextType {
    loadingUser: boolean;
    token: string | null;
    user: Staff | null;
    hasPermission: (permission: string) => boolean;
    setUser: React.Dispatch<React.SetStateAction<Staff | null>>;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
    setLoadingUser: React.Dispatch<React.SetStateAction<boolean>>;
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
    const [loadingUser, setLoadingUser] = useState(true);
    const hasPermission = (permission: string) => {
        return user?.role.permissions.includes(permission) ?? false;
    };
    const { showModal } = useModal();

    const refreshUser = async () => {
        try {
            const savedToken = sessionStorage.getItem("accessToken");
            
            if (!savedToken) {
                setUser(null);
                setToken(null);
                setLoadingUser(false);
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

            if (response.status === 401) {
                setUser(null);
                setToken(null);
                showModal({
                    title: "Session Expired",
                    description: "Your session has expired. Please log in again.",
                    confirmText: "Okay",
                    onConfirm: async () => {
                        sessionStorage.removeItem("accessToken");
                        window.location.href = "/central/admin/login";
                    },
                });
                setLoadingUser(false);
                return;
            }

            if (response.ok) {
                const data = await response.json();
                setUser(data.data ?? data);
                setToken(savedToken);
            } else {
                setUser(null);
                setToken(null);
                showModal({
                    title: "Error",
                    description: "Failed to fetch user profile. Please log in again.",
                    confirmText: "Okay",
                    onConfirm: async () => {
                        sessionStorage.removeItem("accessToken");
                        window.location.href = "/central/admin/login";
                    },
                });
            }

        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setUser(null);
            setToken(null);
        } finally {
            setLoadingUser(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    return (
        <UserContext.Provider
            value={{
                loadingUser,
                token,
                user,
                hasPermission,
                setUser,
                setToken,
                setLoadingUser,
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