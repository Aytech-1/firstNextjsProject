'use client';
import { useToast } from "@/components/ui/toast-provider";
import { Loader, CheckCheck } from "lucide-react";
import { getDeviceId } from "@/lib/device";
import { useRouter } from 'next/navigation'
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useUser } from "@/app/context/usercontext";


const LoginOtp = () => {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const { refreshUser } = useUser();

    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

    async function verifyOtp(code?: string) {
        const otpCode = code ?? otp;
        if (!otpCode.trim()) {
            showToast("OTP is Required!", "error");
            return
        }

        const emailAddress = sessionStorage.getItem("emailAddress");

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/central/auth/verify-login-otp`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': APP_KEY ?? '',
                    'x-device-id': getDeviceId()
                },
                body: JSON.stringify({ otpCode, emailAddress })
            });

            const data = await response.json();
            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                sessionStorage.clear();
                showToast(data.message);
                sessionStorage.setItem("accessToken", data.accessToken);
                sessionStorage.removeItem("emailAddress");
                await refreshUser();
                router.push('/central/admin/dashboard');
            } else {
                showToast(data.message, "error");
            }

        } catch (error) {
            showToast("An error occurred while logging in.", "error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="w-[80%] flex flex-col justify-start gap-5  mx-auto animate__animated animate__fadeIn">
                <h1 className='text-2xl! text-center'>Complete login with OTP</h1>
                <InputField
                    id="otp"
                    label="OTP"
                    type="text"
                    value={otp}
                    maxLength={6}
                    inputMode="numeric"
                    disabled={loading}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setOtp(value);
                        if (value.length === 6) {
                            verifyOtp(value);
                        }
                    }}
                />

                <Button
                    id="login-btn"
                    text={loading ? "VERIFYING" : "VERIFY OTP"}
                    type="submit"
                    disabled={loading}
                    leftIcon={loading ? <Loader className="animate-spin" /> : <CheckCheck />}
                    onClick={() => verifyOtp()}
                />
            </div>
        </>
    )
}

export default LoginOtp