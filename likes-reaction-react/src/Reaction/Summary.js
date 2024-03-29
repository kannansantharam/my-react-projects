import { HeartIcon, Like, Clap, Close } from './Icons'
const LIKE_REACTION_ID = 1;
const HEART_REACTION_ID = 3;
const CLAP_REACTION_ID = 4;
function Summary({ users, reactionContent, onReactionSelection, closeSummary }) {
    if (!users.length) {
        return
    }
    let userList = users[0].data;
    let userContentReaction = users[1].data;
    if (reactionContent.length) {
        userContentReaction = reactionContent
    }
    const renderReactions = (Id) => {
        if (Id === LIKE_REACTION_ID) {
            return Like
        }
        if (Id === HEART_REACTION_ID) {
            return HeartIcon
        }
        if (Id === CLAP_REACTION_ID) {
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
                <ul className="summary-nav">
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 0)} className="summary-nav active">All</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 1)} className='summary-nav'>{Like}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 3)} className='summary-nav'>{HeartIcon}</li>
                    <li onClick={(e) => displaySpecificReactionsSummary(e, 4)} className='summary-nav'>{Clap}</li>
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
            <div className="close-summary" onClick={() => closeSummary()}>
                {Close}
            </div>
        </div>
    )
}
export default Summary;