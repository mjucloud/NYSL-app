import scheduleFall from '../data/JSON/schedule';
import React, { useState } from 'react';
import './game_shcedule.css';
import { Banner, ShrinkHeader } from '../components/headings';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';
import { useDoubleTap } from 'use-double-tap';


console.log(scheduleFall)


export const LocationDetails = ({ locationRef, isInitiallyVisible }) => {
  const location = scheduleFall.Location[locationRef];
  const [isMapVisible, setIsMapVisible] = useState(isInitiallyVisible);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  if (location) {
    return (
      <>

        <p className="font-weight-bold card-text mb-1" onClick={toggleMapVisibility}>
          Location: {location.Name}
        </p>
        <div className="hover-highlight">
          <p className="card-text mapLink" onClick={toggleMapVisibility}>
            {location.Details}
          </p>
        </div>
        {isMapVisible && (
          <div className={`map-container ${isMapVisible ? '' : 'd-none'}`}>
            <iframe title="Google Maps" src={location.gMaps} width="100%" height="400"></iframe>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const GameCard = ({ id, game }) => {
  const { Teams, Date, Time, Location } = game;

  const navigate = useNavigate();
  const gameDetailUrl = `/game/${id}`;
  const handleCardDoubleClick = () => {
    navigate(gameDetailUrl);
  };
  const handleCardDoubleTap = useDoubleTap((e) => {
    navigate(gameDetailUrl);
  })


  return (
    <div className={`card gameCard`} onDoubleClick={handleCardDoubleClick} {...handleCardDoubleTap}>
      <div className='card-body'>
        <h5 className='card-title'>{Date}</h5>
        <h6 className='card-subtitle'>Teams: {Teams}</h6>
        <p className='card-text'>Time: {Time}</p>
        <LocationDetails locationRef={Location} isInitiallyVisible={false} />
      </div>
    </div>
  );
};


const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="carousel-arrow carousel-arrow-left" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="carousel-arrow carousel-arrow-right" onClick={onClick}>
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
};

export const GameSchedule = ({ onMatchClick }) => {
  const septemberGames = scheduleFall.Games.September;

  const sliderSettings = {
    dots: false, // Hide navigation dots
    infinite: true, // Enable infinite looping
    speed: 500,
    swipe: false, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at a time 
    slidesToScroll: 1, // Number of slides to scroll per click
    responsive: [
      {
        breakpoint: 960, // Adjust settings for smaller screens
        settings: {
          slidesToShow: 2,
          swipe: true
        },
      },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    appendDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div>
      <div>
        <ShrinkHeader className='page-title' title={'Upcoming in September'} />
        <Slider {...sliderSettings}>
          {Object.entries(septemberGames).map(([match, game]) => (
            <GameCard key={match} id={match} game={game} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
