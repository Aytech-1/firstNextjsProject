'use client';
import { redirect,useParams } from "next/navigation";

export default function MyProfile() {
    const {schooltypeId} = useParams();
    redirect(`/central/admin/dashboard/school/${schooltypeId}`)
}