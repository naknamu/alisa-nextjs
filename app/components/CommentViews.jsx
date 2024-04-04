import CommentView from './CommentView'

export default function CommentViews({comments, image}) {

  return (
    comments.map(function(comment) {
        return <CommentView key={comment._id} comment={comment} image={image} />
    })
  )
}
