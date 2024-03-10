"use client";

import Link from "next/link";
import style from "./Navbar.module.css";
import { useSession } from "next-auth/react";
import CategoryBtn from "./CategoryBtn";
import { useEffect, useState } from "react";
import LogBtn from "./LogBtn";
import ProfileBtn from "./ProfileBtn";

export default function Navbar() {
  const { data } = useSession();
  const [categories, setCategories] = useState(null);
  const [isMenu, setIsMenu] = useState(false);

  const handleMenu = () => {
    console.log("menu!");
    if (isMenu) {
      setIsMenu(false);
    } else {
      setIsMenu(true);
    }
  };

  useEffect(() => {
    // fetch categories from API
    async function getCategories() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const data = await res.json();
      setCategories(data);
    }

    getCategories();
  }, []);

  return (
    <nav className={style.nav}>
      <Link href="/">
        <h1 className={style.logo}>Alisa</h1>
      </Link>
      <div className={style.log_btn_dektop}>
        <LogBtn />
      </div>

      <div className={style.menu} onClick={handleMenu}>
        <span className="material-symbols-outlined">menu</span>
      </div>
      {isMenu && (
        <div className={style.menu_overlay}>
          <div className={style.menu_content}>
            <div className={style.menu_content_head}>
              <div onClick={() => setIsMenu(false)}>
                {data && <ProfileBtn uploaderName={data.user.name} />}
              </div>
              <span
                className="material-symbols-outlined"
                onClick={() => setIsMenu(false)}
              >
                close
              </span>
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
              <div>{categories && <CategoryBtn categories={categories} />}</div>
              <div>
                <LogBtn />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
