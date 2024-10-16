import Cookies from "js-cookie";
import { useUserStore } from "../lib/store/userStore";

interface UserData {
  email: string;
  name: string;
  fullName: string;
  picture: string;
  accessToken: string;
}

export const useSession = () => {
  const setUser = useUserStore((state) => state.setUser)
  const userExit = useUserStore((state) => state.exit)

  const createSession = (user: UserData) => {

    Cookies.set(
      "session",
      JSON.stringify({
        email: user.email,
        name: user.name,
        fullName: user.fullName,
        picture: user.picture,
        accessToken: user.accessToken,
      }),
      {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
      }
    );

    setUser({
      email: user.email,
      name: user.name,
      fullName: user.fullName,
      picture: user.picture,
    })
  }

  const deleteSession = () => {
    Cookies.remove("session")
    userExit()
  }

  return { createSession, deleteSession }
}