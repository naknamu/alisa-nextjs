"use client";

import style from "./page.module.css";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const [uploaderInfo, setUploaderInfo] = useState({ email: "", password: "" });
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: uploaderInfo.email,
      password: uploaderInfo.password,
      redirect: false,
    });
  
    if (res.status === 200) {
      console.log(res);
      router.push("/");
      router.refresh();
      setIsError(false);
    } else {
      console.log(res.error);
      setIsError(true);
    }

  };

  return (
    <main>
      <div className={style.container}>
        <div className={style.header}>
          <h2>Log in to your account</h2>
          <p>
            Or{" "}
            <span>
              <Link href={`/signup`} className={style.signup}>
                sign up for a new account
              </Link>
            </span>{" "}
          </p>
        </div>
        <div className={style.form_wrapper}>
          <form onSubmit={handleSubmit} className={style.form}>
            <div>
              <label htmlFor="emailOrUsername">Email address or Username</label>
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

            {isError && <span className={style.error}>Invalid credentials. Please try again...</span>}

            <button type="submit" className={style.button}>Log in</button>
          </form>
        </div>
      </div>
    </main>
  );
}
