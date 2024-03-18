import SignupForm from "../components/SignupForm";
import style from "./page.module.css";
import Link from "next/link";

export const dynamic = 'force-static';

export default function Signup() {
  return (
    <main>
      <div className={style.container}>
        <div className={style.header}>
          <h2>Sign up to upload images</h2>
          <p>
            Or{" "}
            <span>
              <Link href={`/login`} className={style.signup}>
                sign in to your existing account
              </Link>
            </span>{" "}
          </p>
        </div>
        <SignupForm />
      </div>
    </main>
  );
}
