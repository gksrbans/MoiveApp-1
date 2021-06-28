import React, { Fragment } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { Col } from 'antd';

const GridCardOne = ({ posts }) => {
    console.log(posts, "GridCardOne")
    if (posts.landingPage) {
        return(
            <>
            {Array.isArray(posts) ? posts.map(({ id, poster_path, movieName, characterName}) => {
                return (
                    <Col lg={6} md={8} xs={24}>
                    <div style={{ position: 'relative' }}>
                    <a href={`/movie/${id}`}>
                        <img
                        style={{ width: '100%', height: '320px' }}
                        src={`${IMAGE_BASE_URL}w1280${poster_path}`}
                        alt={movieName}
                        />
                    </a>
                    </div>
                </Col>
                )
            }) : null}
            </>
        )
    } else {
        return(
            <>
            hello
            </>
        )
    }
}


export default GridCardOne
