'use client';
import { useRouter } from "next/navigation";
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
const Login = () => {
    const router = useRouter()

    return (
        <>
            <div className="w-[80%] flex flex-col gap-5 justify-center items-center mx-auto animate__animated animate__fadeIn">
                <h1 className='text-2xl! text-center'>Login To Your Account</h1>
                <InputField
                    id="email"
                    label="Email Address"
                    type="email"
                    value=""
                    onChange={() => { }}
                />
                <InputField
                    id="password"
                    label="Password"
                    type="password"
                    value=""
                    onChange={() => { }}
                />
                <Button
                    id="login-btn"
                    text="LOG-IN"
                    type="submit"
                    onClick={() => router.push("/central/admin/dashboard")}
                />
                <p className='w-full text-[12px] text-gray-500 bg-amber-100 p-4 rounded border border-amber-300'>Forgot your password? <span className="text-[12px] text-(--primary-color) cursor-pointer" onClick={() => router.push('/admin/reset-password')}>RESET PASSWORD</span></p>
            </div>
        </>
    )
}

export default Login