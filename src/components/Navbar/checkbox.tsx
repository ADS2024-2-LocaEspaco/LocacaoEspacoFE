import { Dispatch } from "react"

interface CheckboxProps {
    isChecked: boolean
    setIsChecked: Dispatch<boolean>
    text: string
}

export default function Checkbox({ isChecked, setIsChecked, text }: CheckboxProps) {
        
    return (
        <div className="flex items-center gap-2">
            <span className="text-base text-black-100 ">{text}</span>

            <input checked={isChecked} onChange={(event) => setIsChecked(event.target.checked)} type="checkbox" className="h-4 w-4 accent-blue-400" />
        </div>
    )
};
