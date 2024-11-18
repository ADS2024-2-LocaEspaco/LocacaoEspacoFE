import { useUserStore } from "@/lib/store/userStore";
import Navbar from "@/components/navbar";

export default function Home() {
    const user = useUserStore((state) => state.user)

    return (
        <div className="h-full min-h-screen">
            <Navbar/>
            <h1>HOME</h1>

        </div>
    )
}
