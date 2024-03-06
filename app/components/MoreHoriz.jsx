"use client";

import { useState } from "react";
import style from "./MoreHoriz.module.css";
import Panel from "./Panel";
import { useSession } from "next-auth/react";

export default function MoreHoriz({ image }) {
  const [togglePanel, setTogglePanel] = useState(false);
  const { data } = useSession();

  const handleMorehoriz = () => {
    // Toggle Panel
    if (togglePanel) {
      setTogglePanel(false);
    } else {
      setTogglePanel(true);
    }
  }

  return (
    <div className={style.container}>
        <span className="material-symbols-outlined" onClick={handleMorehoriz}>more_horiz</span>
        {/**Enable edit and delete functionality on uploader's own images **/}
        {togglePanel && (data?.user?.name === image.uploader.slug) && <Panel />}
    </div>
  )
}
