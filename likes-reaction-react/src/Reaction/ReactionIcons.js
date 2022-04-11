import { useState } from "react";
import { HeartIcon, Like, Clap } from './Icons'
function ReactionIcons({ updateCounts }) {
    const ReactButton = <svg xmlns="http://www.w3.org/2000/svg" fill="#333" width="25" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM164.1 325.5C158.3 318.8 148.2 318.1 141.5 323.9C134.8 329.7 134.1 339.8 139.9 346.5C162.1 372.1 200.9 400 255.1 400C311.1 400 349.8 372.1 372.1 346.5C377.9 339.8 377.2 329.7 370.5 323.9C363.8 318.1 353.7 318.8 347.9 325.5C329.9 346.2 299.4 368 255.1 368C212.6 368 182 346.2 164.1 325.5H164.1zM176.4 176C158.7 176 144.4 190.3 144.4 208C144.4 225.7 158.7 240 176.4 240C194 240 208.4 225.7 208.4 208C208.4 190.3 194 176 176.4 176zM336.4 240C354 240 368.4 225.7 368.4 208C368.4 190.3 354 176 336.4 176C318.7 176 304.4 190.3 304.4 208C304.4 225.7 318.7 240 336.4 240z" /></svg>


    const [isShowReaction, setShowReaction] = useState(false)
    const displayReactions = () => {
        setShowReaction((prevState) => !prevState)
    }
    const updateReactionCount = (type) => {
        setShowReaction((prevState) => !prevState);
        updateCounts(type)
    }
    return (
        <div className="reaction-icon-section">
            {isShowReaction ?
                <div className="reaction-buttons">
                    <div className="react-button" onClick={() => updateReactionCount("LikeCount")}>
                        <div className="react-button-title react-like">Like</div>
                        {Like}
                    </div>
                    <div className="react-button" onClick={() => updateReactionCount("HeartCount")}>
                        <div className="react-button-title react-heart">Heart</div>
                        {HeartIcon}
                    </div>
                    <div className="react-button" onClick={() => updateReactionCount("ClapCount")}>
                        <div className="react-button-title react-clap">Appreciate</div>
                        {Clap}
                    </div>
                </div>
                : ''}

            <div className="react-trigger-section" onClick={() => { displayReactions() }}>
                <div className="react-trigger-button">
                    {ReactButton}
                </div>
            </div>
        </div>
    )
}
export default ReactionIcons;