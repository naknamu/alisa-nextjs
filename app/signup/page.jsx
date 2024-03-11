"use client";

import style from "./page.module.css";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const [uploaderInfo, setUploaderInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    if (toggle) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      }
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
        router.push(`/uploader/${data.uploader}`);
        router.refresh();
        setIsError(false);
      }
    } else {
      console.log(data);
      setIsError(true);
    }
  };

  return (
    <main>
      <div className={style.container}>
        <div className={style.header}>
          <h2>Sign up to upload images</h2>
          <p>
            Or{" "}
            <span>
              <Link href={`/login`} className={style.signup}>
                sign in to your existing account
              </Link>
            </span>{" "}
          </p>
        </div>
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
                  className={style.password_eye}
                  onClick={() => handleToggle()}
                >
                  {toggle && (
                    <span className="material-symbols-outlined">
                      visibility_off
                    </span>
                  )}
                  {!toggle && (
                    <span className="material-symbols-outlined">
                      visibility
                    </span>
                  )}
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

            <button type="submit" className={style.button}>
              Sign up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
