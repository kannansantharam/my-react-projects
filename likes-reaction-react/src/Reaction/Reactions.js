import { useReducer } from "react";
import { HeartIcon, Like, Clap } from './Icons'
import ReactionIcons from './ReactionIcons'
function reducer(state, action) {
    let newState = {};
    switch (action.type) {
        case 'LikeCount':
            let like = state.toggleLike ? state.LikeCount + 1 : state.LikeCount - 1;
            newState = {
                LikeCount: like,
                toggleLike: !state.toggleLike
            };
            if (!state.toggleHeart) {
                newState["HeartCount"] = state.HeartCount - 1;
                newState["toggleHeart"] = !state.toggleHeart
            }
            if (!state.toggleClap) {
                newState["ClapCount"] = state.ClapCount - 1;
                newState["toggleClap"] = !state.toggleClap
            }
            return { ...state, ...newState };

        case 'HeartCount':
            let heart = state.toggleHeart ? state.HeartCount + 1 : state.HeartCount - 1;
            newState = {
                HeartCount: heart,
                toggleHeart: !state.toggleHeart
            };
            if (!state.toggleLike) {
                newState["LikeCount"] = state.LikeCount - 1;
                newState["toggleLike"] = !state.toggleLike
            }
            if (!state.toggleClap) {
                newState["ClapCount"] = state.ClapCount - 1;
                newState["toggleClap"] = !state.toggleClap
            }
            return { ...state, ...newState };

        case 'ClapCount':
            let clap = state.toggleClap ? state.ClapCount + 1 : state.ClapCount - 1;
            newState = {
                ClapCount: clap,
                toggleClap: !state.toggleClap
            };
            if (!state.toggleLike) {
                newState["LikeCount"] = state.LikeCount - 1;
                newState["toggleLike"] = !state.toggleLike
            }
            if (!state.toggleHeart) {
                newState["HeartCount"] = state.HeartCount - 1;
                newState["toggleHeart"] = !state.toggleHeart
            }
            return { ...state, ...newState };

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
                    <div className={"like-count icon-count " + (!state.toggleLike ? 'active' : '')} onClick={() => updateCounts("LikeCount")}>
                        {Like}  {state.LikeCount}
                    </div> : ''}
                {state.HeartCount ?
                    <div className={"heart-count icon-count " + (!state.toggleHeart ? 'active' : '')} onClick={() => updateCounts("HeartCount")}>
                        {HeartIcon}  {state.HeartCount}
                    </div> : ''}
                {state.ClapCount ?
                    <div className={"clap-count icon-count " + (!state.toggleClap ? 'active' : '')} onClick={() => updateCounts("ClapCount")}>
                        {Clap} {state.ClapCount}
                    </div> : ''}
            </div>
            <ReactionIcons updateCounts={updateCounts} />
        </div>
    )
}
export default Reactions;