"use client"

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { deleteCookie } from 'cookies-next';
import toast from "react-hot-toast";

export default function LogBtn() {
  const { data } = useSession();
  const router = useRouter();

  function logout() {
    signOut({
      redirect: false,
    });

    // Delete auth cookie
    deleteCookie('auth_token');

    toast.success("Until next time! 🤗")
    router.push("/login");
    router.refresh();
  }

  return (
    <div>
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
    </div>
  );
}
