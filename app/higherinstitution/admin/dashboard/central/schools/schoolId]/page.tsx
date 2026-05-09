'use client'
import { redirect, useParams } from "next/navigation";

export default function ViewProfile() {
    const { branchId } = useParams();
    redirect(`/admin/dashboard/branch`)
}