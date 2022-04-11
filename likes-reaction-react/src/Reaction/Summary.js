import { HeartIcon, Like, Clap } from './Icons'
function Summary({ users, reactionContent, onReactionSelection }) {
    if (!users.length) {
        return
    }
    let userList = users[0].data;
    let userContentReaction = users[1].data;
    if (reactionContent.length) {
        userContentReaction = reactionContent
    }
    const renderReactions = (userId) => {
        let reactId = userContentReaction.find(a => a.user_id === userId);
        if (!reactId) {
            return Like
        }
        let Id = reactId.reaction_id;
        if (Id === 1 || Id === 5) {
            return Like
        }
        if (Id === 2 || Id === 3) {
            return HeartIcon
        }
        if (Id === 4) {
            return Clap
        }
    }
    const displaySpecificReactionsSummary = (element, reactionId) => {
        document.querySelectorAll(".summary-header-navbar ul li").forEach((list) => {
            list.classList.remove("active")
        });
        element.currentTarget.classList.add("active");
        onReactionSelection(reactionId)
    }
    return (
        <div className="summary-section">
            <h5>Reactions</h5>
            <div className="summary-header-navbar">
                <ul>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 0)} className="active">All</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 1)} className=''>{Like}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 2)} className=''>{HeartIcon}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 4)} className=''>{Clap}</li>
                </ul>
            </div>
            <div className="summary-content-section">
                {
                    userList.map((user) => {
                        return <div key={user.id} className="summary-content">
                            <div className="user-profile summary-info">
                                <img src={user.avatar} />
                            </div>
                            <div className="user-reaction summary-info">
                                {renderReactions(user.id)}
                            </div>
                            <div className="user-name summary-info">
                                {user.first_name + user.last_name}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default Summary;