"use client";

import { baseURL } from "@/utils/constant";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa6";
import { toast } from "react-toastify";
import axios from "axios";
import { isLogin, setAuthentication } from "@/utils/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pageReady, setPageReady] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      if (await isLogin()) {
        router.push("/");
      } else {
        setPageReady(true);
      }
    };
    authenticate();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    axios
      .post(`${baseURL}/login`, payload)
      .then((res) => {
        console.log(res.data);

        setAuthentication(res.data.token);
        toast.success("Login Successful");
        router.push("/");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div
      className={`${pageReady ? "block" : "hidden"} grid grid-cols-[1fr,30%]`}
    >
      <div className="h-screen grid place-items-center">
        <div className="text-center">
          <h1 className="text-accent font-bold text-4xl">
            Login to Your Account
          </h1>
          <div className="flex items-center gap-4 pt-8 w-fit mx-auto">
            <div className="icon__wrapper">
              <FaFacebookF />
            </div>
            <div className="icon__wrapper">
              <FaGoogle />
            </div>
            <div className="icon__wrapper">
              <FaInstagram />
            </div>
          </div>

          <p className="pt-8 text-[13px] text-gray-400">
            Or use your email account for registration.
          </p>

          <form
            className="flex w-[300px] mx-auto flex-col pt-2 gap-2"
            onSubmit={handleSubmit}
          >
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input__style"
              type="email"
              placeholder="Email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input__style"
              type="password"
              placeholder="Password"
              required
            />

            <p>Forgot your password?</p>

            <button className="uppercase bg-accent px-4 py-2 text-white mt-4">
              Login
            </button>
          </form>
        </div>
      </div>

      <div className="bg-accent h-screen grid place-items-center">
        <div className="text-center w-full text-white space-y-8">
          <h2 className="font-bold text-4xl">Hello Friend!</h2>
          <div className="text-[#eeeeee] w-fit mx-auto">
            <p>Enter your personal details</p>
            <p>and start your journey with us</p>

            <Link href="/signup">
              <button className="uppercase px-4 py-2 w-[100%] rounded-full border-2 mt-8">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
