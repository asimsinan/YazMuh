import Comment from "./Comment";
const CommentList = ({ commentList }) => {
      return commentList.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ));
    }
  export default CommentList;
  