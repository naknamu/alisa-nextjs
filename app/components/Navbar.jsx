"use client";

import Link from "next/link";
import style from "./Navbar.module.css";
import { useSession } from "next-auth/react";
import CategoryBtn from "./CategoryBtn";
import { useState } from "react";
import LogBtn from "./LogBtn";
import ProfileBtn from "./ProfileBtn";
import Footer from "./Footer";
import { getCategories } from "@/app/actions.js"
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const { data } = useSession();
  const [categories, setCategories] = useState(null);
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = async () => {

    const data = await getCategories();
    setCategories(data);

    if (isMenu) {
      setIsMenu(false);
    } else {
      setIsMenu(true);
    }
  };

  return (
    <nav className={style.nav}>
      <Link href="/">
        <h1 className={style.logo}>Alisa</h1>
      </Link>
      <div className={style.log_btn_dektop}>
        <LogBtn />
      </div>

      <div className={`icon ${style.menubtn}`} onClick={() => handleMenu()}>
        <IoIosMenu />
      </div>
      {isMenu && (
        <div className={style.menu_overlay}>
          <div className={style.menu_content}>
            <div className={style.menu_content_head}>
              <div onClick={() => setIsMenu(false)}>
                {data && <ProfileBtn uploaderName={data.user.name} />}
              </div>
              <div className="icon" onClick={() => setIsMenu(false)}>
                <IoMdClose />
              </div>
            </div>
            <div
              className={style.menu_btn_group}
              onClick={() => setIsMenu(false)}
            >
              {data && (
                <Link
                  href={`/uploader/${data.user.name}/upload`}
                  className={style.uploadbtn}
                >
                  <b>Upload Image</b>
                </Link>
              )}
              {categories && <CategoryBtn categories={categories} />}
              <div>
                <LogBtn />
              </div>
              <Footer />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
