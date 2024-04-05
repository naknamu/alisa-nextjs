import CommentView from './CommentView'

export default function CommentViews({ image }) {

  const root_comments = image.comments.filter(
    (comment) => comment.parent == undefined
  );

  return (
    root_comments.map(function(comment) {
        return <CommentView key={comment._id} comment={comment} />
    })
  )
}
