"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { getDeviceId } from "@/lib/device";
import { People } from "@/types/user";

interface UserContextType {
    user: People | null;
    setUser: React.Dispatch<React.SetStateAction<People | null>>;
}

// Create the context with undefined as the default value
const UserContext = createContext<UserContextType | undefined>(undefined);

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

export function UserProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<People | null>(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                // Use the same key you stored during login
                const token = sessionStorage.getItem("accessToken");

                if (!token) return;

                const response = await fetch(
                    `${BASE_URL}/central/fetch-profile`,
                    {
                        cache: "no-store",
                        method: "GET",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "x-api-key": APP_KEY ?? "",
                            "x-device-id": getDeviceId(),
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    return;
                }

                const data = await response.json();

                // If your API returns { success: true, data: {...user} }
                // use: setUser(data.data);
                // If it returns the user object directly, use: setUser(data);
                setUser(data.data ?? data);
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            }
        }

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);

    // Prevent useUser() from returning undefined
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}