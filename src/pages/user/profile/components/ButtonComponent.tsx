interface ButtonComponentProps {
    onClick: () => void;
    label: string;
    icon: string;
    bgColor: string;
    textColor: string; 
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
    onClick,
    label,
    icon,
    bgColor,
    textColor,
}) => {
    return (
        <button onClick={onClick} className={`mt-auto ${bgColor} ${textColor} flex items-center rounded-2xl px-2 py-1 border-solid border border-black m-1 gap-1`}>
            {label}

            <div className="material-symbols-outlined">
                {icon}
            </div>
        </button>
    );
};

export default ButtonComponent;