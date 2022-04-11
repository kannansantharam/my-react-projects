import { useReducer, useEffect } from "react";
import axios from "axios";
import { HeartIcon, Like, Clap } from './Icons'
import ReactionIcons from './ReactionIcons'
import Summary from "./Summary";
const LIKE_REACTION_ID = 1;
const HEART_REACTION_ID = 3;
const CLAP_REACTION_ID = 4;

function calculateReactionCounts(reactionCounts, contentId) {

    if (!reactionCounts.length) {
        return {}
    }
    let content = reactionCounts.filter(c => c.content_id === contentId);
    let likeCount = content.filter(r => r.reaction_id === LIKE_REACTION_ID).length; //|| r.reaction_id === 2
    let heartCount = content.filter(r => r.reaction_id === HEART_REACTION_ID).length; //|| r.reaction_id === 4
    let clapCount = content.filter(r => r.reaction_id === CLAP_REACTION_ID).length;
    let counts = { like: likeCount, heart: heartCount, clap: clapCount };
    return counts
}
function Reactions({ reactionCounts, contentId }) {

    let initialState = {
        LikeCount: 0,
        HeartCount: 0,
        ClapCount: 0,
        toggleLike: true, //if true increment value
        toggleHeart: true,
        toggleClap: true,
        users: [],
        usersContents: [],
        initialSetup: false,
        reactionId: {
            content1: 0,
            content2: 0
        }
    }
    function reducer(state, action) {
        let newState = {};
        switch (action.type) {
            case 'LikeCount':
                let like = state.toggleLike ? state.LikeCount + 1 : state.LikeCount - 1;
                newState = {
                    LikeCount: like,
                    toggleLike: !state.toggleLike
                };
                addReaction(1, action.contentId);
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
            case 'Users':
                return { ...state, users: action.data }
            case "UsersContents":
                return { ...state, usersContents: action.data }
            case "SetInitialCounts":
                let data = action.data
                return { ...state, LikeCount: data.LikeCount, HeartCount: data.HeartCount, ClapCount: data.ClapCount, initialSetup: true }
            case "StoreReactionId":
                let reactionIds = state.reactionId;
                reactionIds[action.key] = action.data
                return { ...state, reactionId: reactionIds }
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    const addReaction = async function (reactionId, contentId) {
        try {
            console.log("adding reaction")
            let url = 'https://my-json-server.typicode.com/artfuldev/json-db-data/user_content_reactions';
            let body = {
                "user_id": 11,
                "reaction_id": reactionId,
                "content_id": contentId
            }
            let headers = {
                "content-type": "application/json"
            }
            let reaction = await axios.post(url, { headers: headers, data: body })
            console.log(reaction)
            dispatch({ type: "StoreReactionId", key: "content" + contentId, data: reaction.data.id })
        }
        catch (ex) {
            console.log(ex);
        }
    }
    const removeReaction = async function (reactionId) {
        try {
            console.log("removing reaction")
            let url = 'https://my-json-server.typicode.com/artfuldev/json-db-data/user_content_reactions/' + reactionId;
            let deletedReaction = await axios.delete(url, {})
            console.log(deletedReaction)
        }
        catch (ex) {
            console.log(ex);
        }
    }
    const updateCounts = (actionType, contentId) => {
        dispatch({ type: actionType, contentId: contentId })
    }

    useEffect(() => {
        console.log("component mounteed ", reactionCounts)
        let iconCounts = calculateReactionCounts(reactionCounts, contentId);
        let data = {
            LikeCount: iconCounts.like,
            HeartCount: iconCounts.heart,
            ClapCount: iconCounts.clap,
            initialSetup: true
        }
        dispatch({ type: "SetInitialCounts", data: data });
    }, [reactionCounts]);

    const getUserContentReactions = async () => {
        if (state.users.length) {
            return state.users;
        }
        console.log("Api call");
        let users = axios.get('https://my-json-server.typicode.com/artfuldev/json-db-data/users', {});
        let userContentReaction = axios.get(`https://my-json-server.typicode.com/artfuldev/json-db-data/user_content_reactions?content_id=${contentId}`, {})
        let promise = [users, userContentReaction];
        try {
            let users = await Promise.all(promise);
            console.log(users);
            dispatch({ type: "Users", data: users });
        } catch (ex) {
            console.log(ex)
            return '';
        }
    }
    const showReactionSummary = (element) => {
        console.log("summart ", element);
        document.querySelectorAll(".reaction-summary-section").forEach((node) => {
            node.style.display = "none"
        })
        getUserContentReactions();
        element.target.parentNode.parentNode.querySelector(".reaction-summary-section") ? element.target.parentNode.parentNode.querySelector(".reaction-summary-section").style.display = "block" : ''
    }
    const hideReactionSummary = () => {
        console.log("hiding")
        document.querySelectorAll(".reaction-summary-section").forEach((node) => {
            node.style.display = "none"
        })
    }
    const getReactionContent = async (reactionId) => {
        let url = `https://my-json-server.typicode.com/artfuldev/json-db-data/user_content_reactions?reaction_id=${reactionId}&content_id=${contentId}`;
        if (reactionId === 0) {
            dispatch({ type: "UsersContents", data: state.users[1] });
        }
        try {
            let reactionContents = await axios.get(url, {});
            dispatch({ type: "UsersContents", data: reactionContents.data });
        }
        catch (ex) {
            console.log(ex)
            return ''
        }
    }
    const onReactionSelection = (reactionId) => {
        getReactionContent(reactionId)
    }
    return (
        <div className="reaction-section">
            <div className="reaction-summary-section">
                <Summary users={state.users} reactionContent={state.usersContents}
                    onReactionSelection={onReactionSelection}
                    closeSummary={() => hideReactionSummary()} />
            </div>

            <div className="reaction-counts">
                {state.LikeCount ?
                    <div className={"like-count icon-count " + (!state.toggleLike ? 'active' : '')}
                        onClick={() => updateCounts("LikeCount", contentId)}
                        onMouseOver={(e) => showReactionSummary(e)}
                    >
                        {Like} .  {state.LikeCount}
                    </div> : ''}
                {state.HeartCount ?
                    <div className={"heart-count icon-count " + (!state.toggleHeart ? 'active' : '')}
                        onClick={() => updateCounts("HeartCount", contentId)}
                        onMouseOver={(e) => showReactionSummary(e)}
                    >
                        {HeartIcon} . {state.HeartCount}
                    </div> : ''}
                {state.ClapCount ?
                    <div className={"clap-count icon-count " + (!state.toggleClap ? 'active' : '')}
                        onClick={() => updateCounts("ClapCount", contentId)}
                        onMouseOver={(e) => showReactionSummary(e)}
                    >
                        {Clap} . {state.ClapCount}
                    </div> : ''}
            </div>
            <ReactionIcons updateCounts={updateCounts} />
        </div>
    )
}
export default Reactions;