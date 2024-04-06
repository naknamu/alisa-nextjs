import dynamic from "next/dynamic";
import SkeletonLoader from "./SkeletonLoader";

const CommentView = dynamic(() => import("./CommentView"), {
  ssr: false,
  loading: () => <SkeletonLoader />,
});

export default function CommentViews({ image }) {
  const root_comments = image.comments.filter(
    (comment) => comment.parent == undefined
  );

  return root_comments.map(function (comment) {
    return <CommentView key={comment._id} comment={comment} />;
  });
}
