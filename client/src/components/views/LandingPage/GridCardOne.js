import React, { Fragment } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import { Col } from 'antd';

const GridCardOne = ({ posts, landingPage, characterName }) => {
    
    if (landingPage) {
        return(
            <>
            {Array.isArray(posts) ? posts.map(({ id, poster_path, movieName }, index) => {
                return (
                    <Col lg={6} md={8} xs={24} key={ index }>
                    <div style={{ position: 'relative', padding: 8 }}>
                    <a href={`/movie/${id}`}>
                        <img
                        style={{ width: '100%', height: '320px' }}
                        src={`${IMAGE_BASE_URL}w1280${poster_path}`}
                        alt={ movieName }
                        />
                    </a>
                    </div>
                </Col>
                )
            }) : null}
            </>
        )
    } else {
        return (
            <Col lg={6} md={8} xs={24}>
              <div style={{ position: 'relative' }}>
                <img
                  style={{ width: '100%', height: '320px' }}
                  src={posts.image}
                  alt={ characterName }
                />
              </div>
            </Col>
          );
    }
}


export default GridCardOne
