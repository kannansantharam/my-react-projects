import { useEffect, useState } from 'react';
import Reactions from "../Reaction/Reactions";

function Posts() {
    const [images, setImages] = useState([])
    useEffect(() => {
        fetch('https://my-json-server.typicode.com/artfuldev/json-db-data/users')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                setImages(json)
            })
    }, []);
    return (
        <div className="posts-section">


            <div className="image-post">
                <img src="/public/images/isro.jpeg" alt="" />
                <Reactions />
            </div>
            <div className="image-post">
                <img src="https://github.com/kannansantharam/my-react-projects/blob/development/likes-reaction-react/src/Images/rocket.jpeg" alt="rocket" />
                <Reactions />
            </div>

        </div>
    )
}
export default Posts;