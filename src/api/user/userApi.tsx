import { useSession } from "@/hooks/useSession"
import axios from "axios"
import { useRouter } from "next/router"

export function UserApi() {
    const session = useSession()
    const router = useRouter()

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:3001/google"
    }

    const getUserData = async (token: string, path: string) => {

        try {
            const user = await axios.get(`http://localhost:3001/user/${token}`)
            session.createSession(user.data)
            
            router.push(path)
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Erro de requisição:', error.response?.data || error.message);
            } else {
                console.error('Erro desconhecido:', error);
            }
        }
    }

    return { loginWithGoogle, getUserData }
}