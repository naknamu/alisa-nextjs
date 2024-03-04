import Link from "next/link";
import style from "./ProfileBtn.module.css";

export default function ProfileBtn({ uploaderName }) {
  return (
    <div>
      <Link href={`/uploader/${uploaderName}`} className={style.profile}>
        <span className="material-symbols-outlined">account_circle</span>
        {uploaderName}
      </Link>
    </div>
  );
}
