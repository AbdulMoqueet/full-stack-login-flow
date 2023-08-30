"use client";

import { isLogin, logOut } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        setPageReady(true);
      } else {
        router.push("/login");
      }
    };

    authenticate();
  }, []);

  const handleLogOut = () => {
    logOut();
    toast.success("Logout Successfully");
    router.push("/login");
  };

  return (
    <main
      className={`${
        pageReady ? "block" : "hidden"
      } w-full h-screen grid place-items-center`}
    >
      <div className="p-4 bg-accentDark text-white w-[400px] h-[250px] text-center space-y-4">
        <p>Hi {user?.name}, Welcome!</p>
        <p>{user?.email}</p>
        <button
          className="bg-accent px-4 py-2 text-white"
          onClick={handleLogOut}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
