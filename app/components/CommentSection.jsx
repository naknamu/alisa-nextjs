import CommentAdd from "./CommentAdd";
import { getSession } from "../actions";
import CommentViews from "./CommentViews";
import style from "./CommentSection.module.css";

const getComments = async (image) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/`);
  const data = await res.json();
  const image_comments = data.filter((comment) => image._id === comment.image);
  const root_comments = image_comments.filter(
    (comment) => comment.parent == undefined
  );

  return root_comments;
};

export default async function CommentSection({ image }) {
  const comments = await getComments(image);
  const session = await getSession();

  return (
    <div className={style.container}>
      {session && <CommentAdd image={image} />}
      <CommentViews comments={comments} image={image} />
    </div>
  );
}
