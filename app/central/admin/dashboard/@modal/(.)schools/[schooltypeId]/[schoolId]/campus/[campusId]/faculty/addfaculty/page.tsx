'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserPlus, X, Plus, Trash2 } from "lucide-react";
import InputField from "@/components/ui/text-field";
import Button from "@/components/ui/button";
import { useToast } from "@/components/ui/toast-provider";
import { getDeviceId } from "@/lib/device";

interface FacultyItem {
    facultyCode: string;
    facultyName: string;
}

const AddFacultyPage = () => {
    const router = useRouter();
    const { showToast } = useToast();
    // 1. Manage state as an array of faculty objects
    const [faculties, setFaculties] = useState<FacultyItem[]>([
        { facultyCode: "", facultyName: "" }
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. Handle dynamically modifying input values by index
    const handleInputChange = (index: number, field: keyof FacultyItem, value: string) => {
        const updated = [...faculties];
        updated[index][field] = value;
        setFaculties(updated);
    };

    // 3. Add a new empty row
    const addMoreFaculty = () => {
        setFaculties([...faculties, { facultyCode: "", facultyName: "" }]);
    };

    // 4. Remove a row (ensure at least 1 remains)
    const removeFaculty = (index: number) => {
        if (faculties.length === 1) return;
        setFaculties(faculties.filter((_, i) => i !== index));
    };

    // 5. Submit bulk payload to Laravel Backend
    const handleSubmit = async () => {
        // Simple client-side validation check
        const hasEmptyCodes = faculties.some(f => !f.facultyCode.trim());
        if (hasEmptyCodes) {
            showToast("Please fill in all Faculty Codes.", "error");
            return;
        }

        setIsSubmitting(true);
        try {
            const token = sessionStorage.getItem("accessToken");
            const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";
            const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || "";


            const response = await fetch(`${BASE_URL}/higher/faculty`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                    "X-Branch-Id": "CAM001",
                    "X-App-Key": APP_KEY,
                    "x-device-id": getDeviceId(),
                },

                body: JSON.stringify({
                    faculties
                }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                showToast(result.message || "Faculties saved successfully!", "success");
                router.back();
            } else {
                showToast(result.message || "Validation or server setup error occurred.", "error");
            }
        } catch (error) {
            showToast("Network error. Please try again later.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="absolute right-0 w-112.5 h-full bg-[#f8f8f8] animate__animated animate__fadeInRight">
            {/* Top Navigation Panel Header */}
            <div className="h-15 flex items-center justify-center bg-[rgba(250,245,229,0.5)]">
                <div className="w-[90%] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-6 h-6 rounded-md bg-linear-to-r from-[#9d043c] to-[#F5874F]">
                            <UserPlus size={16} className="text-white" />
                        </div>
                        <div className="text-[18px] text-(--secondary-color)">
                            CREATE NEW FACULTY
                        </div>
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1 px-3 py-2 rounded-full cursor-pointer text-white text-sm bg-linear-to-r from-[#9d043c] to-[#F5874F]"
                    >
                        <X size={18} /> Close
                    </button>
                </div>
            </div>

            {/* Main Form Scrolling Body */}
            <div className="absolute bottom-0 right-0 w-full h-[calc(100%-60px)] overflow-auto flex flex-col">
                <p className="px-5 py-3 text-sm text-(--link-color) bg-[rgba(250,245,229,0.5)] shadow">
                    You are about to create new faculties, please complete the form below
                </p>

                <div className="flex justify-center py-5 bg-[#f8f8f8]">
                    <div className="w-[90%] flex flex-col gap-4">

                        {/* Loop dynamically through entries state */}
                        {faculties.map((faculty, index) => (
                            <div key={index} className="bg-white rounded shadow p-4 flex flex-col gap-5 relative">

                                <div className="flex items-center justify-between border-b pb-2">
                                    <div className="flex items-center gap-2">
                                        <UserPlus size={18} className="text-(--primary-color2)" />
                                        <span className="text-sm font-semibold text-gray-500">
                                            Faculty Form #{index + 1}
                                        </span>
                                    </div>
                                    {/* Don't show remove icon on the baseline row element */}
                                    {faculties.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeFaculty(index)}
                                            className="text-red-500 hover:text-red-700 p-1 rounded transition-colors"
                                            title="Remove row"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-col gap-5">
                                    <InputField
                                        id={`facultyCode-${index}`}
                                        label="Faculty Code"
                                        value={faculty.facultyCode}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, "facultyCode", e.target.value)
                                        }
                                    />

                                    <InputField
                                        id={`facultyName-${index}`}
                                        label="Faculty Name"
                                        value={faculty.facultyName}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            handleInputChange(index, "facultyName", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        ))}

                        {/* Interactive UI Action Elements */}
                        <div className="flex flex-col gap-3 mt-2">
                            <button
                                type="button"
                                onClick={addMoreFaculty}
                                className="flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-md bg-white text-gray-600 text-sm font-medium hover:border-gray-400 hover:bg-gray-50 transition-all cursor-pointer"
                            >
                                <Plus size={16} /> Add More Fields
                            </button>

                            <div className="flex justify-center mt-2">
                                <Button
                                    id="create-btn"
                                    text={isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddFacultyPage;