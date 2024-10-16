import Navbar from "@/components/navbar";
import { useUserStore } from "@/lib/store/userStore";
import Image from "next/image";

export default function Home() {
    const user = useUserStore((state) => state.user)
    return (
        <>
            <Navbar/>
            <h1>HOME</h1>

            <h2>{user?.name}</h2>
            <h2>{user?.email}</h2>
            <h2>{user?.fullName}</h2>

            <Image src={user?.picture || ''} alt="Avatar" width={100} height={100} />
        </>
    )
}
