import { useEffect, useState } from 'react';
import Reactions from "../Reaction/Reactions";
import Comments from '../Comments/Comments'
import axios from 'axios';


function Posts() {
    const [reactionsData, setReactionsData] = useState([])
    useEffect(() => {
        const getUsersContent = async () => {
            try {
                let data = await axios.get('https://my-json-server.typicode.com/artfuldev/json-db-data/user_content_reactions', {})
                setReactionsData(data.data)
            } catch (ex) {
                console.log(ex)
            }
        }
        getUsersContent()
    }, [])
    const hideSummary = (e) => {
        if (!(e.target.className.baseVal || e.target.parentElement.className.baseVal
            || e.target.parentElement.parentElement.className.includes("summary-nav")
            || e.target.parentElement.className.includes("summary-nav")
            || e.target.className.includes("summary-nav")
        )) {
            document.querySelectorAll(".reaction-summary-section").forEach((node) => {
                node.style.display = "none"
            })
        }

    }
    return (
        <div className="posts-section" onClick={(e) => hideSummary(e)}>
            <div className="image-post">
                <img src="https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/isro.jpeg" alt="isro" />
                <Reactions reactionCounts={reactionsData} contentId={1} like={reactionsData.length} />
                <Comments username="Kannan Santharam" content="Hi there, Congrats on successfull launch" reactionCounts={reactionsData} />
            </div>
            <div className="image-post">
                <img src="https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/rocket.jpeg" alt="isro" />
                <Reactions reactionCounts={reactionsData} contentId={2} like={reactionsData.length} />
                <Comments username="Kannan Santharam" content="Way to go!" reactionCounts={reactionsData} />
            </div>

        </div>
    )
}
export default Posts;