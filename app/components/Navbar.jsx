import Link from "next/link"
import style from "./Navbar.module.css"

export default function Navbar() {
  return (
    <nav className={style.nav}>
        <Link href="/">
          <h1>Alisa</h1>
        </Link>
        <Link href="/login">Login</Link>
    </nav>
  )
}
