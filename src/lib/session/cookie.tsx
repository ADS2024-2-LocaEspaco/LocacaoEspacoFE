import Cookies from "js-cookie";
import { useUserStore } from "../store/userStore";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

export const useSession = () => {
  const [setUser, userExit] = useUserStore((state) => [state.setUser, state.exit])

  const createSession = (user: UserData) => {

    Cookies.set(
      "session",
      JSON.stringify({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
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
      firstName: user.firstName,
      lastName: user.lastName,
      picture: user.picture,
    })
  }

  const deleteSession = () => {
    Cookies.remove("user");
    userExit()
  }

  return { createSession, deleteSession }
}