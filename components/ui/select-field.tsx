// 'use client';

// import { useState } from "react";
// import { SelectFieldProps } from "@/types/ui";
// import styles from "@/styles/component/selectfield.module.css";
// import {ArrowDown} from "lucide-react";

// const SelectField = (props: SelectFieldProps) => {
//     const [open, setOpen] = useState(false);
//     const [search, setSearch] = useState("");

//     const selected = props.options.find(
//         (opt) => opt.value === props.value
//     );

//     const filteredOptions = props.options.filter((opt) =>
//         opt.label.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className={styles.formGroup}>
//             <div
//                 className={`${styles.inputBox} ${props.className || ""}`}
//                 onClick={() => setOpen(!open)}
//             >
//                 <span className={!selected ? "text-gray-400" : ""}>
//                     {selected?.label || ""}
//                 </span>
//                 <span>
//                     <ArrowDown size={16} className="text-gray-400" />
//                 </span>
//             </div>

//             <label
//                 className={`${styles.floatingLabel} ${open || selected ? styles.activeLabel : ""}`}
//             >
//                 {props.label}
//             </label>

//             {open && (
//                 <div className={styles.dropdown}>
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className={styles.searchInput}
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />

//                     {filteredOptions.map((opt) => (
//                         <div
//                             key={opt.value}
//                             className={styles.option}
//                             onClick={() => {
//                                 props.onChange?.(opt.value);
//                                 setOpen(false);
//                                 setSearch("");
//                             }}
//                         >
//                             {opt.label}
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SelectField;

// 'use client';

// import { useState, useRef, useEffect } from "react";
// import { SelectFieldProps } from "@/types/ui";
// import styles from "@/styles/component/selectfield.module.css";
// import { ArrowDown, ArrowUp, X } from "lucide-react";

// const SelectField = (props: SelectFieldProps) => {
//     const [open, setOpen] = useState(false);
//     const [search, setSearch] = useState("");
//     const containerRef = useRef<HTMLDivElement>(null);

//     const selected = props.options.find(opt => opt.value === props.value);

//     const filteredOptions = props.options.filter(opt =>
//         opt.label.toLowerCase().includes(search.toLowerCase())
//     );

//     useEffect(() => {
//         const handleClickOutside = (e: MouseEvent) => {
//             if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
//                 setOpen(false);
//                 setSearch("");
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className={styles.formGroup} ref={containerRef}>
//             <div
//                 className={`${styles.inputBox} ${props.className || ""}`}
//                 onClick={() => setOpen(prev => !prev)}
//             >
//                 <span className={!selected ? "text-gray-400" : ""}>
//                     {selected?.label || ""}
//                 </span>
//                 <span>
//                     {open
//                         ? <X size={16} className="text-gray-400" />
//                         : <ArrowDown size={16} className="text-gray-400" />
//                     }
//                 </span>
//             </div>

//             <label className={`${styles.floatingLabel} ${open || selected ? styles.activeLabel : ""}`}>
//                 {props.label}
//             </label>

//             {open && (
//                 <div className={styles.dropdown}>
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         className={styles.searchInput}
//                         value={search}
//                         onChange={(e) => setSearch(e.target.value)}
//                     />
//                     {filteredOptions.length > 0 ? (
//                         filteredOptions.map((opt) => (
//                             <div
//                                 key={opt.value}
//                                 className={styles.option}
//                                 onClick={() => {
//                                     props.onChange?.(opt.value);
//                                     setOpen(false);
//                                     setSearch("");
//                                 }}
//                             >
//                                 {opt.label}
//                             </div>
//                         ))
//                     ) : (
//                         <div className={`${styles.option} text-gray-400 cursor-default`}>
//                             No results found
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SelectField;

'use client';

import { useState, useRef, useEffect } from "react";
import { SelectFieldProps } from "@/types/ui";
import styles from "@/styles/component/selectfield.module.css";
import { ArrowDown, X } from "lucide-react";

const SelectField = (props: SelectFieldProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const selected = props.options.find(opt => opt.value === props.value);

    const filteredOptions = props.options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    return (
        <div className={styles.formGroup} ref={containerRef}>
            <div
                className={`${styles.inputBox} ${props.className || ""}`}
                onClick={() => setOpen(prev => !prev)}
            >
                {open ? (
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder={selected?.label || "Search..."}
                        className="w-full outline-none bg-transparent text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <span className={!selected ? "text-gray-400" : ""}>
                        {selected?.label || ""}
                    </span>
                )}
                <span>
                    {open
                        ? <X size={16} className="text-gray-400" />
                        : <ArrowDown size={16} className="text-gray-400" />
                    }
                </span>
            </div>

            <label className={`${styles.floatingLabel} ${open || selected ? styles.activeLabel : ""}`}>
                {props.label}
            </label>

            {open && (
                <div className={styles.dropdown}>
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((opt) => (
                            <div
                                key={opt.value}
                                className={styles.option}
                                onClick={() => {
                                    props.onChange?.(opt.value);
                                    setOpen(false);
                                    setSearch("");
                                }}
                            >
                                {opt.label}
                            </div>
                        ))
                    ) : (
                        <div className={`${styles.option} text-gray-400 cursor-default`}>
                            No record found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectField;