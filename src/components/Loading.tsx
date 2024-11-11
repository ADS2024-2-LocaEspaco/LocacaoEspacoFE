import Image from 'next/image';
import Circle from '../../public/icons/circle_icon.svg'

export default function Loading() {
    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen bg-white">
            <Image src={Circle} alt={'spinner'} className='animate-spin' color='#FF6F00'/>
        </div>
    );
};