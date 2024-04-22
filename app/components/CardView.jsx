"use client";

import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { RxViewGrid } from "react-icons/rx";
import { CiGrid2H } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import style from "./CardView.module.css";

export default function CardView() {
  const router = useRouter();
  const [isCardView, setIsCardView] = useState(false);

  useEffect(() => {
    // Initialize isCardView to 'TRUE' if changed
    if (getCookie("card_view") === "TRUE") {
      setIsCardView(true);
    }
  }, []);

  const handleClick = () => {
    if (getCookie("card_view") === "TRUE") {
      setCookie("card_view", "FALSE");
      setIsCardView(false);
    } else {
      setCookie("card_view", "TRUE");
      setIsCardView(true);
    }

    toast.success("Image view was changed.");
    router.refresh();
  };

  return (
    <div className={style.container}>
      <div
        className="icon"
        onClick={() => handleClick()}
        data-tooltip-id="my-tooltip-1"
      >
        {isCardView && <RxViewGrid />}
        {!isCardView && <CiGrid2H />}
      </div>
      <Tooltip id="my-tooltip-1" place="bottom" content="Change image view" />
    </div>
  );
}
