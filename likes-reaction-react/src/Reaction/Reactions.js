import { useReducer } from "react";
import { HeartIcon, Like, Clap } from './Icons'
import ReactionIcons from './ReactionIcons'
function reducer(state, action) {
    console.log(state)
    switch (action.type) {
        case 'LikeCount':
            return { ...state, LikeCount: state.LikeCount === 0 ? 1 : 0 };
        case 'HeartCount':
            return { ...state, HeartCount: state.HeartCount === 0 ? 1 : 0 };

        case 'ClapCount':
            return { ...state, ClapCount: state.ClapCount === 0 ? 1 : 0 };
        default:
            return state
    }
}
let initialState = {
    LikeCount: 0,
    HeartCount: 0,
    ClapCount: 0
}
function Reactions() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const updateCounts = (actionType) => {
        dispatch({ type: actionType })
    }
    return (
        <div className="reaction-section">

            <div className="reaction-counts">
                {state.LikeCount ?
                    <div className="like-count icon-count" onClick={() => updateCounts("LikeCount")}>
                        {Like}  {state.LikeCount}
                    </div> : ''}
                {state.HeartCount ?
                    <div className="heart-count icon-count" onClick={() => updateCounts("HeartCount")}>
                        {HeartIcon}  {state.HeartCount}
                    </div> : ''}
                {state.ClapCount ?
                    <div className="clap-count icon-count" onClick={() => updateCounts("ClapCount")}>
                        {Clap} {state.ClapCount}
                    </div> : ''}
            </div>
            <ReactionIcons updateCounts={updateCounts} />
        </div>
    )
}
export default Reactions;