import { HeartIcon, Like, Clap } from './Icons'
function Summary(userList) {
    if (!userList.users.length) {
        return
    }
    let users = userList.users[0].data;
    let userContentReaction = userList.users[1].data;
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
    return (
        <div className="summary-section">
            <h5>Reactions</h5>
            <div className="summary-header-navbar">
                <ul>
                    <li className="active">All</li>
                    <li>{Like}</li>
                    <li>{HeartIcon}</li>
                    <li>{Clap}</li>
                </ul>
            </div>
            <div className="summary-content-section">
                {
                    users.map((user) => {
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