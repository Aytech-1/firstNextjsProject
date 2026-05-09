import { LayoutProps } from "@/types/ui";

function BranchModalLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm bg-black/60 z-70 ">
                {children}
            </div>
        </>
    )
}

export default BranchModalLayout