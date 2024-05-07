import Rating from "./Rating";
import {formatDate} from "../services/Utils";
const Comment = ({ comment,index }) => {
  
  return (
    <div key={index} className="row">
      <div className="review">
        <div className="well well-sm review-header ">
          <span className="rating">
            <Rating puan={comment.rating} />
          </span>
          &nbsp;
          <span className="review-author">{comment.author}</span>
          &nbsp;
          <small className="reviewTimestamp">{formatDate(comment.date)}</small>
        </div>
        <div className="col-xs-12 ">{comment.text}</div>
      </div>
    </div>
  );
};
export default Comment;
