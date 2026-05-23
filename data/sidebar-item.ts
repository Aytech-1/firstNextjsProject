import {
  LayoutGrid,
  GitBranchPlus,
  Users,
  BookCheck,
  ClipboardMinus,
  LogOut,
} from "lucide-react";

import { useUser } from "@/app/context/usercontext";

export function useSidebarItems() {
  const { hasPermission } = useUser();

  return [
    {
      name: "dashboard",
      link: "/central/admin/dashboard",
      icon: LayoutGrid,
    },

    hasPermission("manage schools") && {
      name: "staff",
      link: "/central/admin/dashboard/staff",
      icon: Users,
    },

    hasPermission("manage schools") && {
      name: "schools",
      link: "/central/admin/dashboard/schooltype",
      icon: GitBranchPlus,
    },

    {
      name: "publish",
      link: "/central/admin/dashboard/publish",
      icon: BookCheck,
    },

    {
      name: "report",
      link: "/central/admin/dashboard/report",
      icon: ClipboardMinus,
    },

    {
      name: "logout",
      link: "/central/admin/dashboard/logout",
      icon: LogOut,
    },
  ].filter(Boolean);
}