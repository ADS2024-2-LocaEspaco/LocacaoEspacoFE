import { useUserStore } from "@/lib/store/userStore";
import Image from "next/image";

import Navbar from "@/components/Navbar";

export default function Home() {
    const user = useUserStore((state) => state.user)

    return (
        <div className="h-full min-h-screen">
            <Navbar/>
            <h1>HOME</h1>

        </div>
    )
}
