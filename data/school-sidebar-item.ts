'use client';

import {
  LayoutGrid,
  GitBranchPlus,
  Users,
} from "lucide-react";

import { useParams } from "next/navigation";

export const useSchoolSidebarItems = () => {
  const params = useParams();
  
  const { schoolId, schooltypeId } = params as { schoolId: string; schooltypeId: string };

  return [
    {
      name: "dashboard",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}`,
      icon: LayoutGrid,
    },

     {
      name: "staff",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/staff`,
      icon: GitBranchPlus,
    },

    {
      name: "campus",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus`,
      icon: GitBranchPlus,
    },

    {
      name: "settings",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/settings`,
      icon: Users,
    },
  ];
};