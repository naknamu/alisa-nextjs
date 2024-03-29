import Link from "next/link";
import style from "./Navbar.module.css";
import LogBtn from "./LogBtn";
import { getCategories } from "@/app/actions.js";
import MenuMobile from "./MenuMobile";

export default async function Navbar() {
  const categories = await getCategories();

  return (
    <nav className={style.nav}>
      <Link href="/">
        <h1 className={style.logo}>Alisa</h1>
      </Link>
      <div className={style.btn_desktop}>
        <LogBtn />
      </div>
      <div className={style.btn_mobile}>
        <MenuMobile categories={categories} />
      </div>
    </nav>
  );
}
