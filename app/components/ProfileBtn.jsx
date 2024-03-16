import Link from "next/link";
import style from "./ProfileBtn.module.css";
import { CgProfile } from "react-icons/cg";

export default function ProfileBtn({ uploaderName }) {
  return (
    <div>
      <Link href={`/uploader/${uploaderName}`} className={style.profile}>
        <CgProfile className="icon" />
        {uploaderName}
      </Link>
    </div>
  );
}
