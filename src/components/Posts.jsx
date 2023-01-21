import Header from "./Header";
import Post from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Animation from "./Animation"

const Posts = () => {

    const [userInfo, setUserInfo] = useState([])

    const [load, setLoad] = useState(true)

    const getData = async () => {
        const data = await axios.get('https://apurba-insta-clone.onrender.com/posts')
        setLoad(false)
        setUserInfo(data.data)
    }

    useEffect(() => {
        getData()
    }, [])

    const userPost = userInfo.map(post => <Post key={post._id} data={post} />)

    if (load) return (
        <div className="animation">
            {Animation}
            <p className="posts-anim">Loding posts</p>
        </div>)

    return (
        <>
            <Header />
            <div className='parent-container'>
                <div className="container">
                    {userPost}
                </div>
            </div>
        </>
    )
}

export default Posts