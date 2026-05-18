'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { Loader, CheckCheck } from "lucide-react";
import { getDeviceId } from "@/lib/device";
import { useUser } from "@/app/context/usercontext";



const Login = () => {
    const router = useRouter();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
     const { refreshUser } = useUser();

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

    async function submitLogin(e?: React.FormEvent) {
        e?.preventDefault();

        if (!emailAddress.trim()) {
            showToast("Email Address is Required!", "error");
            return;
        }

        if (!password.trim()) {
            showToast("Password is Required!", "error");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/central/auth/login`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': APP_KEY ?? '',
                    'x-device-id': getDeviceId()
                },
                body: JSON.stringify({ emailAddress, password })
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                sessionStorage.clear(); 
                if (data.accessToken) {
                    sessionStorage.setItem("accessToken", data.accessToken);
                    sessionStorage.setItem("permissions", data.permissions);
                    await refreshUser();
                    showToast(data.message);
                    router.push('/central/admin/dashboard');
                } else {
                    showToast(data.message);
                    sessionStorage.setItem("emailAddress", emailAddress);
                    router.push('/central/admin/login-otp');
                }
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
        <form
            onSubmit={submitLogin}
            className="w-[80%] flex flex-col gap-5 justify-center items-center mx-auto animate__animated animate__fadeIn"
        >
            <h1 className="text-2xl! text-center">
                Login To Your Account
            </h1>

            <InputField
                id="email"
                label="Email Address"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
            />

            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                id="login-btn"
                text={loading ? "AUTHENTICATING" : "LOGIN"}
                type="submit"
                disabled={loading}
                leftIcon={loading ? <Loader className="animate-spin" /> : <CheckCheck />}
            />
        </form>
    );
};

export default Login;
