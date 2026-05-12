import {
  LayoutGrid,
  GitBranchPlus,
  Users,
  BookCheck,
  ClipboardMinus,
} from "lucide-react";

export const sidebarItems = [
  {
    name: "dashboard",
    link: "/central/admin/dashboard",
    icon: LayoutGrid,
  },

  {
    name: "staff",
    link: "/central/admin/dashboard/staff",
    icon: Users,
  },

  {
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
];
