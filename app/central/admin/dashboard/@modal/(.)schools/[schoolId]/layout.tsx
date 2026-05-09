'use client';

import { LayoutProps } from "@/types/ui";
import Header from "@/components/layout/school/header";
import SideNav from "@/components/layout/school/side-nav";
import Image from "next/image";

const SchoolLayout = ({ children, modal }: LayoutProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src="/all-images/bg-pix/adminbg.jpg"
        alt="background"
        fill
        className="object-cover"
        priority
      />
      <Header />
      <SideNav />
      <main className="w-[calc(100%-130px)] h-[calc(100%-70px)] absolute right-0 bottom-0 overflow-auto bg-white/50 backdrop-blur-md z-100">
        {children}
      </main>
      {modal}
    </div>
  );
};

export default SchoolLayout;