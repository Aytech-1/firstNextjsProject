'use client';

import {
  LayoutGrid,
  GitBranchPlus,
  Users,
} from "lucide-react";

import { useParams } from "next/navigation";

export const useSchoolSidebarItems = () => {
  const params = useParams();

  const schoolId = params.schoolId as string;

  return [
    {
      name: "dashboard",
      link: `/central/admin/dashboard/schools/${schoolId}`,
      icon: LayoutGrid,
    },

    {
      name: "campus",
      link: `/central/admin/dashboard/schools/${schoolId}/campus`,
      icon: GitBranchPlus,
    },

    {
      name: "settings",
      link: `/central/admin/dashboard/schools/${schoolId}/settings`,
      icon: Users,
    },
  ];
};