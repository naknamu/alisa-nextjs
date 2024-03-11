import style from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={style.container}>
        <div className="link"><Link href="/policies/privacy-policy">Privacy</Link></div>
        <span>·</span>
        <div>Terms</div>
        <span>·</span>
        <div>Alisa © 2024</div>
    </div>
  )
}
