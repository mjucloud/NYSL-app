import scheduleFall from '../data/JSON/schedule';
import React, { useState } from 'react';
import {ShrinkHeader} from '../components/headings'

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
    <div className={`card ${isMapVisible ? 'active' : ''}`}>
    <div className='card-body'>
      <h5 className='card-title'>{Date}</h5>
      <h6 className='card-subtitle'>Teams: {Teams}</h6>
      <p className='card-text'>Time: {Time}</p>
      <LocationDetails locationRef={Location} onMapToggle={handleMapToggle} />
    </div>
  </div>
  );
};
 
 const GameScheduleComplete = ({ onMatchClick }) => {
  const [showOctoberMatches, setShowOctoberMatches] = useState(false);
  const septemberGames = scheduleFall.Games.September;
  const octoberGames = scheduleFall.Games.October;

  return (
    <div>
      <ShrinkHeader />
      <div className='GameEvents grid'>
        {Object.entries(septemberGames).map(([match, game]) => (
          <GameCard key={match} game={game} />
        ))}
      </div>

      <button onClick={() => setShowOctoberMatches(true)} disabled={!octoberGames}>
        Show October Matches
      </button>

      {showOctoberMatches && octoberGames && (
        <div>
          <h2>October</h2>
          {Object.entries(octoberGames).map(([match, game]) => (
            <GameCard key={game.Teams} game={game} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GameScheduleComplete;