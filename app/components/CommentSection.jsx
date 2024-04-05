import CommentAdd from "./CommentAdd";
import { getSession } from "../actions";
import CommentViews from "./CommentViews";
import style from "./CommentSection.module.css";

export default async function CommentSection({ image }) {
  const session = await getSession();

  return (
    <div className={style.container}>
      {session && <CommentAdd image={image} />}
      <CommentViews image={image} />
    </div>
  );
}
