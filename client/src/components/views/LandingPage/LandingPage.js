import React, { useEffect, useState, useRef } from 'react';
import { FaCode } from 'react-icons/fa';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import axios from 'axios';
import GridCards from '../commons/GridCards';
import Counter from './Counter.js'
import GridCardOne from './GridCardOne.js';
import { Row } from 'antd';

function LandingPage() {
  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  //const [CurrentPage, setCurrentPage] = useState(1);
  const CurrentPage = useRef(1) // 라이프 사이클에서 지속, useEffect 또는 콜백 안에서 상태값들을 저장하고 빼오기 위해서는 useState를 사용할 수 없음.

  // useEffect(() => {
  //   const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage}`;
  //   fetchMovies(endpoint);
  // }, [CurrentPage]);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage.current}`;
    fetchMovies(endpoint);
  }, []);


  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((response) => response.json())
      .then((response) => {
        console.log(response, 'fetch response');
        setMovies([...Movies, ...response.results]);
        setMainMovieImage(response.results[0]);
        //setCurrentPage(response.page);
      });
  };

  const loadMoreItems = () => {
    // const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
    //   CurrentPage + 1
    // }`;
    // fetchMovies(endpoint);

    // 리팩토링 => 버튼 클릭시 pagenum ++; 하고 이걸 반영시키고 싶으신듯.
    //setCurrentPage(CurrentPage + 1);
    CurrentPage.current += 1;
    console.log(CurrentPage, '페이지 넘')
  };

    ////////////////////////////////////////    
    const useOnScreen = (options) => {
      const lastPostElementRef = useRef();
      console.log(lastPostElementRef, 'gggg')
  
      //const [visible, setVisible] = useState(false);
  
      useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        console.log(entry, "entry임")
          //setVisible(entry.isIntersecting);
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage.current}`;
        
          if (entry.isIntersecting) {
            console.log(entry.isIntersecting)
            fetchMovies(endpoint);
            //setCurrentPage(CurrentPage + 1);
            CurrentPage.current += 1;

          }
      }, options);
  
      if (lastPostElementRef.current) {
          observer.observe(lastPostElementRef.current);
      }
  
      const LastElementReturnFunc = () => {
          if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
          }
      };
  
      return LastElementReturnFunc;
      }, [lastPostElementRef, options]);
  
      return [lastPostElementRef];
  };

  //const [lastPostElementRef, visible]
  const [lastPostElementRef] = useOnScreen({
    threshold: "0.5",
  });

    ////////////////////////////////////////


  return (
    
    <div style={{ width: '100%', margin: '0' }}>
      <Counter />  
      {/* Main Image */}
      {MainMovieImage &&  
        <MainImage
          image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      }

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <h2>Movies by latest</h2>
        <hr />

        {/* Movie Grid Cards */}

        {/* <Row gutter={[16, 16]}>
          {Movies &&
            Movies.map((movie, index) => (
              <React.Fragment key={index}>
                <GridCards
                  landingPage
                  image={
                    movie.poster_path
                      ? `${IMAGE_BASE_URL}w500${movie.poster_path}`
                      : null
                  }
                  movieId={movie.id}
                  movieName={movie.original_title}
                />
              </React.Fragment>
            ))}
        </Row> fixed 210629 */}

        <Row>
          {Movies && MainMovieImage &&
            <>
              
              <GridCardOne 
                landingPage 
                posts={Movies} 
              />
            </>
          }
        </Row>
        
        <div ref={lastPostElementRef}> </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={loadMoreItems}> Load More</button>
      </div>
    </div>
  );
}

export default LandingPage;
