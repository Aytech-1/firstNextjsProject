import {
  LayoutGrid,
  GitBranchPlus,
  Users,
  BookCheck,
  ClipboardMinus,
  LogOut,
} from "lucide-react";

export function sidebarItems(){
  const permissionString =typeof window !== "undefined" ? sessionStorage.getItem("permissions") || "" : "";
  const permissions = permissionString.split(",").map((permission) => permission.trim().toLowerCase());
  const hasPermission = (permissionName: string): boolean =>permissions.includes(permissionName.toLowerCase());

  return [
    {
      name: "dashboard",
      link: "/central/admin/dashboard",
      icon: LayoutGrid,
      show: true,
    },

    {
      name: "staff",
      link: "/central/admin/dashboard/staff",
      icon: Users,
      show: hasPermission("manage staff"),
    },
    {
      name: "schools",
      link: "/central/admin/dashboard/schooltype",
      icon: GitBranchPlus,
      show: hasPermission("manage schools"),
    },

    {
      name: "publish",
      link: "/central/admin/dashboard/publish",
      icon: BookCheck,
      show: true,
    },

    {
      name: "report",
      link: "/central/admin/dashboard/report",
      icon: ClipboardMinus,
      show: true,
    },

    {
      name: "logout",
      link: "/central/admin/dashboard/logout",
      icon: LogOut,
      show: true,
    },

  ].filter((item) => item.show);
}



