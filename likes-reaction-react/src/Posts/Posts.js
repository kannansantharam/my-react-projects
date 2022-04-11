import { useEffect, useState } from 'react';
import Reactions from "../Reaction/Reactions";
import Comments from '../Comments/Comments'
import axios from 'axios';


function Posts() {
    const [reactionsData, setReactionsData] = useState([])
    useEffect(() => {
        console.log("Getting reaction counts");
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
    return (
        <div className="posts-section">
            <div className="image-post">
                <img src="https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/isro.jpeg" alt="isro" />
                <Reactions reactionCounts={reactionsData} contentId={1} like={reactionsData.length} />
                <Comments username="Kannan Santharam" content="Hi there, How are you? Look" reactionCounts={reactionsData} />
            </div>

        </div>
    )
}
export default Posts;