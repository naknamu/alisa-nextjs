"use client";

import Link from "next/link";
import style from "./Navbar.module.css";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data } = useSession();
  const router = useRouter();

  function logout() {
    signOut({
      redirect: false,
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <nav className={style.nav}>
      <Link href="/">
        <h1 className={style.logo}>Alisa</h1>
      </Link>
      {!data && (
        <Link href="/login" className="btn_primary">
          <b>Log in</b>
        </Link>
      )}
      {data && (
        <button onClick={() => logout()} className="btn_primary">
          <b>Log out</b>
        </button>
      )}
    </nav>
  );
}
