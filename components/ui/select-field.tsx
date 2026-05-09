'use client';

import { useState } from "react";
import { SelectFieldProps } from "@/types/ui";
import styles from "@/styles/component/selectfield.module.css";
import {ArrowDown} from "lucide-react";

const SelectField = (props: SelectFieldProps) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selected = props.options.find(
        (opt) => opt.value === props.value
    );

    const filteredOptions = props.options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.formGroup}>
            <div
                className={`${styles.inputBox} ${props.className || ""}`}
                onClick={() => setOpen(!open)}
            >
                <span className={!selected ? "text-gray-400" : ""}>
                    {selected?.label || ""}
                </span>
                <span>
                    <ArrowDown size={16} className="text-gray-400" />
                </span>
            </div>

            <label
                className={`${styles.floatingLabel} ${open || selected ? styles.activeLabel : ""
                    }`}
            >
                {props.label}
            </label>

            {open && (
                <div className={styles.dropdown}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {filteredOptions.map((opt) => (
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
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectField;