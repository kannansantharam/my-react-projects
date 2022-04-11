import { HeartIcon, Like, Clap } from './Icons'
function Summary({ users, reactionContent, onReactionSelection, contentId }) {
    if (!users.length) {
        return
    }
    let userList = users[0].data;
    let userContentReaction = users[1].data;
    if (reactionContent.length) {
        userContentReaction = reactionContent
    }
    const renderReactions = (Id) => {
        // let reactId = userContentReaction.find(a => a.user_id === userId);
        // if (!reactId) {
        //     return Like
        // }
        // let Id = reactId.reaction_id;
        if (Id === 1) {
            return Like
        }
        if (Id === 3) {
            return HeartIcon
        }
        if (Id === 4) {
            return Clap
        }
        return ''
    }
    const displaySpecificReactionsSummary = (element, reactionId) => {
        document.querySelectorAll(".summary-header-navbar ul li").forEach((list) => {
            list.classList.remove("active")
        });
        element.currentTarget.classList.add("active");
        onReactionSelection(reactionId)
    }
    const getUserDetails = (userId, type, type2 = '') => {
        let us = userList.find(u => u.id === userId)
        if (type2) {
            return us[type] + " " + us[type2]
        }
        return us[type]
    }
    return (
        <div className="summary-section">
            <h5>Reactions</h5>
            <div className="summary-header-navbar">
                <ul>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 0)} className="active">All</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 1)} className=''>{Like}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 3)} className=''>{HeartIcon}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 4)} className=''>{Clap}</li>
                </ul>
            </div>
            <div className="summary-content-section">
                {
                    userContentReaction.map((user, index) => {
                        if (!renderReactions(user.reaction_id)) { return }
                        return <div key={user.user_id + "_" + index} className="summary-content">
                            <div className="user-profile summary-info">
                                <img src={getUserDetails(user.user_id, "avatar")} />
                            </div>
                            <div className="user-reaction summary-info">
                                {renderReactions(user.reaction_id)}
                            </div>
                            <div className="user-name summary-info">
                                {getUserDetails(user.user_id, "first_name", "last_name")}
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default Summary;