import { Button, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config';
import GridCards from '../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';

function MovieDetail(props) {
  let movieId = props.match.params.movieId;
  const [Movie, setMovie] = useState([]);
  const [Casts, setCasts] = useState([]);
  const [ActorToggle, setActorToggle] = useState(false);

  useEffect(() => {
    let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;

    fetch(endpointInfo)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setMovie(response);
      });

    fetch(endpointCrew)
      .then((response) => response.json())
      .then((response) => {
        console.log(response, 'Crew');
        setCasts(response.cast);
      });
  }, []);

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  return (
    <div>
      {/* Header */}
      {Movie.backdrop_path &&
        <MainImage
        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
        title={Movie.original_title}
        text={Movie.overview}
        />
      }

      {/* Body */}

      {/* Movie Info */}
      <MovieInfo movie={Movie} />

      <br />
      {/* Actors Grid*/}

      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}
      >
        <Button onClick={toggleActorView}> Toggle Actor View </Button>
      </div>
      {ActorToggle && (
        <Row gutter={[16, 16]}>
          {Casts &&
            Casts.map((cast, index) => (
              <React.Fragment key={index}>
                {cast.profile_path && 
                <GridCards
                  landingPage
                  image={
                    cast.profile_path
                      ? `${IMAGE_BASE_URL}w500${cast.profile_path}`
                      : null
                  }
                  characterName={cast.name}
                />
                }
              </React.Fragment>
            ))}
        </Row>
      )}
      <br />

      {/* Comments */}
    </div>
  );
}

export default MovieDetail;
