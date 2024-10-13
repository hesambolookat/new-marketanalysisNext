import { HTMLInputTypeAttribute, ChangeEvent } from "react";

interface Props {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    label?: string;
    value?: string; // Add value prop
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
    name?: string; // Add name prop
}

const Input = ({
    type = "text",
    placeholder = "وارد کنید",
    className = "",
    label = "",
    value,
    onChange,
    name,
}: Props) => {
    return (
        <label>
            <div className="label">
                <span className="label-text text-base">{label}</span>
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className={`input input-bordered w-full mb-3 input-md ${className}`}
                value={value}
                onChange={onChange}
                name={name} // Add name to input
            />
        </label>
    );
};

export default Input;
