'use client';
import { redirect,useParams } from "next/navigation";

export default function campus() {
    const {schooltypeId} = useParams();
    redirect(`/central/admin/dashboard/school/${schooltypeId}`)
}