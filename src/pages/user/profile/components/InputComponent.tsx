
import Image from 'next/image';

interface InputComponentProps {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean,
    placeholder:string;
    icon: string | null, 
}

const InputComponent: React.FC<InputComponentProps> = ({
    label,
    id,
    value,
    onChange,
    isEditing = true,
    placeholder = '',
    icon = null, 
}) => {
    return (
        <div className="input-component mt-2">
            <label htmlFor={id} className="text-base font-medium mt-4 dark:text-white">
                {label}
            </label>

            <div className="relative flex items-center">
                <input
                    type="text"
                    id={id}
                    value={value}
                    onChange={onChange}
                    readOnly={!isEditing}
                    placeholder={placeholder}
                    className={`h-8 text-center border border-solid border-black rounded-xl mt-2 placeholder:items-center bg-gray-100 dark:border-white dark:bg-custom-gray-2 dark:text-white pr-8 ${isEditing ? 'pl-8' : ''}`}
                />
                {isEditing && icon && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-1">
                        <Image src={icon} alt="icon" className="h-5 w-5" />
                    </span>
                )}
            </div>
        </div>
    );  
};

export default InputComponent;
