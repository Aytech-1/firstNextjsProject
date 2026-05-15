import { TextFieldProps } from "@/types/ui";
import styles from "@/styles/component/textfield.module.css";

const Textarea = (props: TextFieldProps) => {
    return (
        <div className={styles.formGroup}>
            <textarea
                id={props.id}
                title={props.label}
                className={ `${styles.floatingInput} ${props.className}` }
                placeholder=" "
                required value={props.value}
                readOnly={props.readOnly}
                maxLength={props.maxLength}
            />
            <label
                htmlFor={props.id}
                className={ `${styles.floatingLabel}` }>{props.label}
            </label>
        </div>
    );
};

export default Textarea;