'use client';

import { LayoutProps } from "@/types/ui";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/branch/header";
import SideNav from "@/components/layout/branch/side-nav";

const BranchLayout = ({ children, branchmodal }: LayoutProps) => {
    const router = useRouter();

    return (
        <div className="absolute w-full h-full bg-amber-50">
            <Header />
            <SideNav />
            <div className="w-[calc(100%-130px)] absolute top-17.5 right-0">
                {children}
                {branchmodal}
            </div>
            
        </div>
    );
};

export default BranchLayout;