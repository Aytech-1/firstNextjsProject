'use client';
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import { useToast } from '@/components/ui/toast-provider';
import { useState } from 'react';
import { CheckCheck, Loader } from "lucide-react";
import { useSearchParams } from 'next/navigation';
const NewPassword = () => {
    const router = useRouter()
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const emailAddress = searchParams.get('email');

    async function resetPassword() {
        if (!password.trim()) {
            showToast("Password is Required!", "error");
            return
        }

        if (!password_confirmation.trim()) {
            showToast("Confirm Password is Required!", "error");
            return
        }

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/central/auth/finish-reset-password`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': APP_KEY ?? '',
                },
                body: JSON.stringify({ password, password_confirmation, token, emailAddress })
            });

            const data = await response.json();
            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                showToast(data.message);
                router.push("/central/admin/login")
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
            <div className="w-[80%] flex flex-col gap-5 justify-center items-center mx-auto">
                <h1 className='text-2xl! text-center'>Complete Reset Password</h1>
                <InputField
                    id="password"
                    label="New password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    value={password_confirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                />

                <p className='w-full text-[12px] text-gray-500 bg-amber-100 p-4 rounded border border-amber-300 italic'>At least 8 characters is required.</p>

                <Button
                    id="reset-btn"
                    text={loading ? "AUTHENTICATING" : "RESET PASSWORD"}
                    type="submit"
                    leftIcon={loading ? <Loader className="animate-spin" /> : <CheckCheck />}
                    onClick={resetPassword}
                />
            </div>
        </>
    )
}

export default NewPassword