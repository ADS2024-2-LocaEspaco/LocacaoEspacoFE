import Navbar from "@/components/navbar";
import { useUserStore } from "@/lib/store/userStore";

export default function Home() {
    const user = useUserStore((state) => state.user)
    return (
        <>
            <Navbar/>
            <h1>HOME</h1>

            <h2>{user?.firstName}</h2>
            <h2>{user?.email}</h2>
            <h2>{user?.lastName}</h2>
            <h2>{user?.picture}</h2>
        </>
    )
};
