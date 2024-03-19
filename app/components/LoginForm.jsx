"use client";

import style from "./LoginForm.module.css";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function LoginForm() {
  const [uploaderInfo, setUploaderInfo] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: uploaderInfo.email,
      password: uploaderInfo.password,
      redirect: false,
    });

    if (res.status === 200) {
      toast.success("Logged in successfully!");
      router.push("/");
      router.refresh();
      setIsError(false);
    } else {
      console.log(res.error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={style.form_wrapper}>
      <form onSubmit={handleSubmit} className={style.form}>
        <div>
          <label htmlFor="emailOrUsername">Email or Username</label>
          <input
            className={style.input}
            type="text"
            name="emailOrUsername"
            id="emailOrUsername"
            value={uploaderInfo.email}
            onChange={({ target }) =>
              setUploaderInfo({ ...uploaderInfo, email: target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className={style.input}
            type="password"
            name="password"
            id="password"
            value={uploaderInfo.password}
            onChange={({ target }) =>
              setUploaderInfo({ ...uploaderInfo, password: target.value })
            }
          />
        </div>

        {isError && (
          <span className={style.error}>
            Invalid credentials. Please try again...
          </span>
        )}

        <button type="submit" className={style.button} disabled={isLoading}>
          {!isLoading && <span>Log in</span>}
          {isLoading && <span>Logging in...</span>}
        </button>
      </form>
    </div>
  );
}
