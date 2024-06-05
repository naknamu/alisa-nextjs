"use client";

import ProfileBtn from "./ProfileBtn";
import Footer from "./Footer";
import CategoryBtn from "./CategoryBtn";
import { IoIosMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import style from "./MenuMobile.module.css";
import { useState } from "react";
import { useSession } from "next-auth/react";
import LogBtn from "./LogBtn";
import Link from "next/link";
import BlurToggle from "./BlurToggle";

export default function MenuMobile({ categories }) {
  const { data } = useSession();
  const [isMenu, setIsMenu] = useState(false);
  const [isCategory, setIsCategory] = useState(false);

  const handleMenu = async () => {
    if (isMenu) {
      setIsMenu(false);
    } else {
      setIsMenu(true);
    }
  };

  const handleCategory = async () => {
    if (isCategory) {
      setIsCategory(false);
    } else {
      setIsCategory(true);
    }
  };

  return (
    <div>
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
            >
              {data && (
                <Link
                  href={`/uploader/${data.user.name}/upload`}
                  className={style.uploadbtn}
                >
                  <b>Upload Image</b>
                </Link>
              )}
              {data && <BlurToggle />}
              <div className={style.wrapper}>
              {!data && (
                <Link href="/signup" className={style.signup_btn}>
                  <b>Sign up</b>
                </Link>
              )}
              <b>/</b>
              <LogBtn />
              </div>

              <Link href="/leaderboard"><b>🏆 Leaderboard</b></Link>
              {/* <CategoryBtn categories={categories} /> */}
              <div onClick={() => handleCategory()}><b>🔻Categories</b></div>

              {isCategory && <CategoryBtn categories={categories} />}

              <Footer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
