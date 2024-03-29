"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import style from "./SignupForm.module.css";
import Link from "next/link";
import { notifyWelcome } from "../actions";
import toast from "react-hot-toast";

export default function SignupForm() {
  const router = useRouter();
  const [uploaderInfo, setUploaderInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [isSigning, setIsSigning] = useState(false);

  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSigning(true);

    const newUploader = {
      email: uploaderInfo.email,
      username: uploaderInfo.username,
      password: uploaderInfo.password,
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/uploader/create`,
      {
        method: "POST",
        body: JSON.stringify(newUploader),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (res.status === 200) {
      console.log(data);
      // automatically log in the user
      const res = await signIn("credentials", {
        email: uploaderInfo.email,
        password: uploaderInfo.password,
        redirect: false,
      });
      console.log(res);
      if (res.status === 200) {
        toast.success("Sign up successful!");
        router.push(`/uploader/${data.uploader}`);
        router.refresh();
        notifyWelcome(data.uploader);
        setIsError(false);
      }
    } else {
      console.log(data);
      setIsError(true);
      setIsSigning(false);
    }
  };

  return (
    <div>
      <div className={style.form_wrapper}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div>
            <label htmlFor="email">Email address</label>
            <input
              required
              className={style.input}
              type="email"
              name="email"
              id="email"
              value={uploaderInfo.email}
              onChange={({ target }) =>
                setUploaderInfo({ ...uploaderInfo, email: target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              required
              className={style.input}
              type="text"
              name="username"
              id="username"
              value={uploaderInfo.username}
              onChange={({ target }) =>
                setUploaderInfo({ ...uploaderInfo, username: target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div className={style.password_wrapper}>
              <div
                className={`icon ${style.password_eye}`}
                onClick={() => handleToggle()}
              >
                {toggle && <IoEyeOffOutline />}
                {!toggle && <IoEyeOutline />}
              </div>
              <input
                required
                className={style.input}
                type={toggle ? `text` : `password`}
                name="password"
                id="password"
                value={uploaderInfo.password}
                onChange={({ target }) =>
                  setUploaderInfo({ ...uploaderInfo, password: target.value })
                }
              />
            </div>
          </div>

          {isError && (
            <span className={style.error}>
              Error signing up. Please try again...
            </span>
          )}

          <div className={style.agree}>
            <Link href="/policies/terms-of-services" className="link">
              By signing up, you agree to our terms of services.
            </Link>
          </div>

          <button type="submit" className={style.button} disabled={isSigning}>
            {!isSigning && <span>Sign up</span>}
            {isSigning && <span>Signing up...</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
