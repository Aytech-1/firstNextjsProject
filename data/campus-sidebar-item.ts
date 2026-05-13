'use client';

import {
  LayoutGrid,
  GitBranchPlus,
  Users,
} from "lucide-react";

import { useParams } from "next/navigation";

export const useCampusSidebarItems = () => {
  const params = useParams();

  const {campusId, schoolId, schooltypeId} = params as {campusId: string, schoolId: string, schooltypeId: string};

  return [
    {
      name: "dashboard",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}`,
      icon: LayoutGrid,
    },

    {
      name: "faculty",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}/faculty`,
      icon: GitBranchPlus,
    },

    {
      name: "department",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}/department`,
      icon: GitBranchPlus,
    },

    {
      name: "staff",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}/staff`,
      icon: GitBranchPlus,
    },

    {
      name: "students",
      link: `/central/admin/dashboard/schools/${schooltypeId}/${schoolId}/campus/${campusId}/students`,
      icon: Users,
    },
  ];
};