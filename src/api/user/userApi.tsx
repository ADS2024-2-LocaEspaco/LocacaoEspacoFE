import { useSession } from "@/hooks/useSession"
import axios from "axios"
import { useRouter } from "next/router"

export function UserApi() {
    const session = useSession()
    const router = useRouter()

    const loginWithGoogle = () => {
        window.location.href = "http://localhost:3001/google"

        // window.open('http://localhost:3001/google', '_blank', 'width=450,height=600')
    }

    const getUserData = async (token: string) => {

        try {
            console.log(token)
		const user = await axios.get(`http://localhost:3001/user/${token}`)
		console.log(user.data)
		session.createSession(user.data)
		
		router.push('/home')
        } catch (error) {
            console.error('Error fetching user data:', error)
        }
    }

    return { loginWithGoogle, getUserData }
}