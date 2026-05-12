
import Link from 'next/link';
import { GraduationCap, School, GitBranchPlus, ArrowRight } from 'lucide-react';
import styles from "@/styles/component/dashboard.module.css";




const schoolOptions = [
    {
        id: 1,
        title: 'High School',
        description: 'Secondary education, vocational centers, and grades 9–12 or equivalent.',
        icon: <School className="w-8 h-8" />,
        link: `/central/admin/dashboard/school`
    },
    {
        id: 2,
        title: 'Higher Institution',
        description: 'Universities, Colleges, Polytechnics, or specialized training institutes.',
        icon: <GraduationCap className="w-8 h-8" />,
        link: `/central/admin/dashboard/school`
    },
];

const SelectSchoolType = () => {
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50">
            <div className={`${styles.dashboardHeader} w-full mb-12`}>
                <div className={styles.headerLeft}>
                    <div className={styles.headerIcon}>
                        <GitBranchPlus />
                    </div>
                    <div className={styles.headerText}>
                        <h2>Schools</h2>
                        <p>
                            View and manage all your schools from one dashboard.
                            Keep track of activities, monitor updates, and ensure
                            everything runs smoothly across locations.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex gap-6 w-full px-8">
                {schoolOptions.map((option) => (
                    <Link
                        key={option.id}
                        href={`${option.link}/${option.id}`}
                        className="group relative no-underline w-full"
                        title={`Go to ${option.title} Dashboard`}
                    >
                        <div className="cursor-pointer rounded-2xl border-2 border-black/10 bg-white p-8 transition-all duration-300 flex flex-col items-start gap-4 hover:border-blue-200 hover:shadow-md">
                            <div className="p-4 rounded-xl font-medium text-(--border-color) bg-blue-50">
                                {option.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    {option.title}
                                </h3>
                                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                                    {option.description}
                                </p>
                                <div className="flex items-center text-sm text-blue-600 group-hover:gap-2 transition-all mt-4">
                                    Continue to {option.title}
                                    <ArrowRight size={18} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </div>
                            </div>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SelectSchoolType;