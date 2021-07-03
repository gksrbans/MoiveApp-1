import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';
import { useSelector } from 'react-redux';

function LikeDislikes(props) {
    console.log(props, 'likedislike props')
    const test = useSelector(state => state.user)
    //console.log(test, 'test useSelector')
    
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {};

    if (props.video) {
        variable = { videoId: props.videoId, userId: props.userId }
    } else {
        variable = { commentId: props.commentId, userId: props.userId }
    }

    useEffect(() => {


    }, [])


    return (
        <>
          <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like"></Icon>

                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}></span>
            </span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon

                    />
                </Tooltip>
                <span style={{ paddingLeft: '8px', cursor: 'auto' }}></span>
            </span>
        </>
    )

}

export default LikeDislikes