import { LayoutProps } from "@/types/ui";

function SchoolModalLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm bg-black/60 z-60 ">
                {children}
            </div>
        </>
    )
}

export default SchoolModalLayout