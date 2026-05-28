import { useUser } from "@/app/context/usercontext";

type Props = {
  permission: string;
  children: React.ReactNode;
};

export default function PermissionGuard({
  permission,
  children,
}: Props) {
  const { hasPermission } = useUser(); 

  if (!hasPermission(permission)) {
    return null;
  }

  return children;
}