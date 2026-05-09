import { LayoutProps } from "@/types/ui";
import Header from "@/components/layout/dashboard/header";
import SideNav from "@/components/layout/dashboard/side-nav";
import Image from "next/image";

const DashboardLayout = ({ children, centralmodal}: LayoutProps) => {
  return (
    <>
      <div className=" w-full h-screen">
        <Image
          src="/all-images/bg-pix/adminbg.jpg"
          alt="background" fill
          className="object-cover"
          priority
        />
        <Header />
        <SideNav />
        <main className="w-[calc(100%-120px)] h-[calc(100%-70px)] absolute right-0 bottom-0 overflow-auto bg-white/50 backdrop-blur-md">
          {children}
        </main>
        {centralmodal}
        
      </div>

    </>
  );
};

export default DashboardLayout