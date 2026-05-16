'use client';
import { useRouter } from 'next/navigation'
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import { useToast } from '@/components/ui/toast-provider';
import { useState } from 'react';
import { CheckCheck, Loader } from 'lucide-react';


const ResetPassword = () => {
    const router = useRouter()
    const [emailAddress, setEmailAddress] = useState("");
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY;

    async function resetPassword() {
        if (!emailAddress.trim()) {
            showToast("Email Address is Required!", "error");
            return
        }

        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/central/auth/reset-password`, {
                cache: 'no-store',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-api-key': APP_KEY ?? '',
                },
                body: JSON.stringify({ emailAddress })
            });

            const data = await response.json();
            if (!response.ok) {
                showToast(data.message, "error");
                return;
            }

            if (data.success) {
                showToast(data.message);
                router.push('/central/admin/password-link');
                sessionStorage.setItem("emailAddress", emailAddress);
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
                <h1 className='text-2xl! text-center'>Reset Your Password</h1>
                <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />

                <Button
                    id="proceed-btn"
                    text={loading ? "AUTHENTICATING" : "PROCEED"}
                    type="submit"
                    disabled={loading}
                    leftIcon={loading ? <Loader className="animate-spin" /> : <CheckCheck />}
                    onClick={resetPassword}
                />
                <p className='w-full text-[12px] text-gray-500 bg-(--bg-color) p-4 rounded border border-amber-300'>Already have an account? <span className="text-[12px] text-(--primary-color) cursor-pointer" onClick={() => router.push('/admin/login')}>SIGN-IN</span></p>
            </div>
        </>
    )
}

export default ResetPassword