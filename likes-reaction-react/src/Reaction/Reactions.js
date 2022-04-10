import { useReducer } from "react";
import { HeartIcon, Like, Clap } from './Icons'
import ReactionIcons from './ReactionIcons'
function reducer(state, action) {
    console.log(state)
    switch (action.type) {
        case 'LikeCount':
            let like = state.toggleLike ? state.LikeCount + 1 : state.LikeCount - 1;
            return { ...state, LikeCount: like, toggleLike: !state.toggleLike };

        case 'HeartCount':
            let heart = state.toggleHeart ? state.HeartCount + 1 : state.HeartCount - 1;
            return { ...state, HeartCount: heart, toggleHeart: !state.toggleHeart };

        case 'ClapCount':
            let clap = state.toggleClap ? state.ClapCount + 1 : state.ClapCount - 1;
            return { ...state, ClapCount: clap, toggleClap: !state.toggleClap };

        default:
            return state
    }
}
let initialState = {
    LikeCount: 8,
    HeartCount: 96,
    ClapCount: 20,
    toggleLike: true, //if true increment value
    toggleHeart: true,//if true increment value
    toggleClap: true //if true increment value
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