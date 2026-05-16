'use client';
import Button from "@/components/ui/button";
import { useRouter } from 'next/navigation';

const PasswordLink = () => {
    const router = useRouter()
    const emailAddress = sessionStorage.getItem("emailAddress");
    function returnLogin() {
        router.push('/central/admin/login')
        sessionStorage.removeItem("emailAddress");
    }
    return (
        <>
            <div className="w-[80%] flex flex-col gap-5 justify-center items-center mx-auto">
                <h1 className='text-2xl! text-center'>Mail sent successfully</h1>

                <p className='w-full text-[12px] text-gray-600 bg-amber-100 p-4 rounded border border-amber-300'>
                    A password reset link has been sent to your email address (
                    <span className="text-[12px] text-(--primary-color) font-medium cursor-pointer">
                        {emailAddress}
                    </span>
                    ). Please check your Inbox and Spam folder, then follow the link to reset your password.
                </p>
                <Button
                    id="okay-btn"
                    text="OKAY"
                    onClick={returnLogin}
                />

                <p>MAIL not recieved? RESEND MAIL</p>
            </div>
        </>
    )
}

export default PasswordLink