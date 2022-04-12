import Reactions from "../Reaction/Reactions";

function Comments(props) {
    return (
        <div className="comments-section">
            <div>
                <div className="user-avatar">
                    <img src='https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/isro.jpeg' alt='user profile' />
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