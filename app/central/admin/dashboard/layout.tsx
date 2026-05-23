import { LayoutProps } from "@/types/ui";
import Header from "@/components/layout/dashboard/header";
import SideNav from "@/components/layout/dashboard/side-nav";
import Image from "next/image";
import { DashboardProvider } from "@/app/context/dashboardcontext";

const DashboardLayout = ({ children, modal }: LayoutProps) => {
  return (
    <>
      <DashboardProvider>
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
          {modal}

        </div>
      </DashboardProvider>
    </>
  );
};

export default DashboardLayout