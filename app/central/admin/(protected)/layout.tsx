import { LayoutProps } from "@/types/ui";
import { UserProvider } from '@/app/context/usercontext';

const ProtectedLayout = ({ children }: LayoutProps) => {
    return (
        <UserProvider>
            {children}
        </UserProvider>
    );
};

export default ProtectedLayout