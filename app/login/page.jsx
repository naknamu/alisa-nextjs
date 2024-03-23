import style from "./page.module.css";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export const dynamic = "force-static";
export const revalidate = false;

export default function Login() {
  return (
    <main>
      <div className={style.container}>
        <div className={style.header}>
          <h2>Log in to your account</h2>
          <p>
            Or{" "}
            <span>
              <Link href={`/signup`} className={style.signup}>
                sign up for a new account
              </Link>
            </span>{" "}
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
