import Reactions from "../Reaction/Reactions";

function Comments(props) {
    return (
        <div className="comments-section">
            <div>
                <div className="user-avatar">

                </div>
                <div className="user-comment">
                    <div className="user-name">
                        {props.username}
                    </div>
                    <div className="comment-content">
                        {props.content}
                    </div>
                </div>
            </div>
            <Reactions reactionCounts={props.reactionCounts} contentId={2} />
        </div>
    )
}
export default Comments;