import scheduleFall from '../data/JSON/schedule';
import React, { useState } from 'react';
import './game_shcedule.css';
import {Banner, ShrinkHeader } from '../components/headings';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import { RainSchedule } from './rain_schedule';

console.log(scheduleFall)


const LocationDetails = ({ locationRef, onMapToggle }) => {
  const location = scheduleFall.Location[locationRef];
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
    onMapToggle(!isMapVisible);
  };
  if (location) {
    return (
      <>
        <div className='hover-highlight'>
        <p className='font-weight-bold card-text' onClick={toggleMapVisibility}>
          Location: {location.Name}
        </p>
        <p className='card-text mapLink' onClick={toggleMapVisibility}>
          {location.Details}
        </p>
        </div>
        <div className={`map-container ${isMapVisible ? '' : 'd-none'}`}>
          <iframe title='Google Maps' src={location.gMaps} width='100%' height='300'></iframe>
        </div>
      </>
    );
  }

  return null;
};

const GameCard = ({ game }) => {
  const { Teams, Date, Time, Location } = game;
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const handleMapToggle = (mapVisible) => {
    setIsMapVisible(mapVisible);
  };


  return (
    <div className={`card gameCard ${isMapVisible ? 'active' : ''}`}>
    <div className='card-body'>
      <h5 className='card-title'>{Date}</h5>
      <h6 className='card-subtitle'>Teams: {Teams}</h6>
      <p className='card-text'>Time: {Time}</p>
      <LocationDetails locationRef={Location} onMapToggle={handleMapToggle} />
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
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll per click
    responsive: [
      {
        breakpoint: 960, // Adjust settings for smaller screens
        settings: {
          slidesToShow: 2,
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
      <div className='container'>
      <ShrinkHeader className='page-title' title={'Upcoming in September'}/>
      <Slider {...sliderSettings}>
        {Object.entries(septemberGames).map(([match, game]) => (
          <GameCard key={match} game={game} />
        ))}
      </Slider>
      </div>
    </div>
  );
};
