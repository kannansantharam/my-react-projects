import { useEffect, useState } from 'react';
import Reactions from "../Reaction/Reactions";
import Comments from '../Comments/Comments'


function Posts() {
    return (
        <div className="posts-section">
            <div className="image-post">
                <img src="https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/isro.jpeg" alt="isro" />
                <Reactions like={578} heart={274} clap={95} />
                <Comments username="Kannan Santharam" content="Hi there, How are you? Look" />
            </div>
            <div className="image-post">
                <img src="https://raw.githubusercontent.com/kannansantharam/my-react-projects/development/likes-reaction-react/src/Posts/rocket.jpeg" alt="rocket" />
                <Reactions like={19} heart={4} clap={45} />
            </div>

        </div>
    )
}
export default Posts;