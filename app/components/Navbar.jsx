import Link from "next/link"
import style from "./Navbar.module.css"

export default function Navbar() {
  return (
    <nav className={style.nav}>
        <h1>Alisa</h1>
        <Link href="/login">Login</Link>
    </nav>
  )
}
