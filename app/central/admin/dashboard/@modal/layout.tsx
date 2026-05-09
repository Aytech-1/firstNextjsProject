import { LayoutProps } from "@/types/ui";

function ModalLayout({ children }: LayoutProps) {
    return (
        <>
            <div className="fixed inset-0 backdrop-blur-sm bg-black/60 z-50 ">
                {children}
            </div>
        </>
    )
}

export default ModalLayout