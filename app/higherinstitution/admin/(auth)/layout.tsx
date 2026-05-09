import { LayoutProps } from "@/types/ui";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className='w-full h-screen bg-black/60 flex justify-center items-center'>
      <div className="w-[80%] h-125 flex items-center">
        <div className="w-110 h-80 flex grow justify-center items-center bg-blue-200 rounded-l-full">
          <h1 className='text-(--white-color) text-center text-3xl! '>Welcome To Project Setup With Nextjs
            Administrative Login Portal</h1>
        </div>

        <div className="w-110 h-full bg-(--white-color) flex flex-col justify-center items-center relative">
          <div className="w-full h-full flex justify-center items-center">
            {children}
          </div>

          <div className="w-full  absolute bottom-0 bg-black text-(--white-color) flex flex-col justify-center items-center py-3">© 2025 - 2026. ALL RIGHT RESERVED
            <span className="text-[10px]">POWERED BY: AyForge.</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AuthLayout