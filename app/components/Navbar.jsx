import Link from "next/link";
import style from "./Navbar.module.css";
import LogBtn from "./LogBtn";
import { getCategories } from "@/app/actions.js";
import MenuMobile from "./MenuMobile";
import Notification from "./Notification";
import { getSession } from "@/app/actions.js";

export default async function Navbar() {
  const categories = await getCategories();
  const session = await getSession();

  return (
    <nav className={style.nav}>
      <Link href="/">
        <h1 className={style.logo}>Alisa</h1>
      </Link>
      <div className={style.btn_desktop}>
        {session && <Notification />}
        <LogBtn />
        {!session && (
          <Link href="/signup" className={style.signup_btn}>
            <b>Sign up</b>
          </Link>
        )}
      </div>
      <div className={style.btn_mobile}>
        {session && (
          <span className={style.btn_notif}>
            <Notification />
          </span>
        )}
        <MenuMobile categories={categories} />
      </div>
    </nav>
  );
}
