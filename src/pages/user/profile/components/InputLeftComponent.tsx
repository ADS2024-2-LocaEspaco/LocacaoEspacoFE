import React from 'react';
import Image from 'next/image';
import Asterisk from '../../../../assets/asterisk.svg';

interface InputLeftComponentProps {
    label: string,
    id: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isEditing: boolean,
    icon: string | null, 
}

const InputLeftComponent: React.FC<InputLeftComponentProps> = ({
    label,
    id,
    value,
    onChange,
    isEditing = true,
}) => {
    return (
        <div className='flex items-center'>
            <label htmlFor="phone" className="text-base font-medium mr-4 mt-2 dark:text-white">
                {label}
            </label>

            <div className="relative flex items-center">
                <input 
                    type="text"
                    className={`text-xs h-8 w-48 text-center border border-solid border-black rounded-xl mt-4 bg-gray-100 placeholder:items-center dark:bg-custom-gray-2 dark:border-white dark:text-white ${isEditing ? 'pl-8' : ''}`} 
                    id={id}
                    value={value}
                    onChange={onChange}
                    readOnly={!isEditing}
                />

                {isEditing && (
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 mt-2">
                        <Image src={Asterisk} alt="Asterisk" className="h-5 w-5" />
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputLeftComponent;
