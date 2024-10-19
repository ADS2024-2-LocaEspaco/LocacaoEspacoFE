import Image from 'next/image';
import Asterisk from '../../../../assets/asterisk.svg';

interface InputLargeComponentProps{
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean,
    placeholder:string;
    icon: string | null, 
}

const InputLargeComponent: React.FC<InputLargeComponentProps> = ({
    label,
    id,
    value,
    onChange,
    isEditing = true,
}) => {
    return (
        <div>
            <label htmlFor={id} className="text-base font-medium mt-4 dark:text-white">
                {label}
            </label>
            <div className="relative flex items-center">
                <input
                    type="text"
                    className={`text-xs h-8 text-center border border-solid border-black rounded-xl bg-gray-100 placeholder:items-center
                        dark:bg-custom-gray-2 dark:border-white dark:text-white pr-[140px]
                        ${isEditing ? 'pl-8' : ''}`}
                    id={id}
                    value={value}
                    onChange={onChange}
                    readOnly={!isEditing}
                />
                {isEditing && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mr-2">
                        <Image src={Asterisk} alt="Asterisk" className="h-5 w-5" />
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputLargeComponent;
