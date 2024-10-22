import Link from "next/link";
import Image from "next/image";

import X from '../../public/icons/x.svg'
import GoogleIcon from '../../public/icons/google_logo_icon.svg'
import { UserApi } from "@/api/user/userApi";
import { useRouter } from "next/router";

interface ModalLoginProps {
    closeModal: () => void
}

export default function ModalLogin({closeModal}: ModalLoginProps) {
	const userAPI = UserApi()

    const loginWithGoogle = async () => {
		userAPI.loginWithGoogle();     
	}

    return (
        <div onClick={closeModal} className="fixed inset-0 h-full w-screen flex items-center justify-center bg-black-100 bg-opacity-80">
            <div onClick={(event) => event.stopPropagation()} className="flex flex-col gap-8 max-w-80 rounded-lg p-6 bg-white">
                <Image onClick={closeModal} src={X} alt={'Ícone de voltar'} className="size-3 self-end cursor-pointer hover:opacity-80" />

                <button onClick={loginWithGoogle} className="flex items-center justify-center gap-2 py-3 text-black-200 font-bold border rounded-lg hover:opacity-80">
                    <Image src={GoogleIcon} alt="Logo da Google" className="size-7"/>    
                    Continuar com o Google
                </button>

                <p className="text-justify text-black-200 text-sm">Clicando em {'"Continuar com o Google"'}, você concorda com os <Link href={'/terms'} className="text-black-300 font-bold underline hover:opacity-80">termos de uso</Link> e <Link href={'/terms'} className="text-black-300 font-bold underline hover:opacity-80">políticas de privacidade</Link>.</p>
            </div>
        </div>
    )
};
