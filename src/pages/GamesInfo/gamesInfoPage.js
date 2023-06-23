import scheduleFall from '../data/JSON/schedule';
import React, { useState } from 'react';
import { ShrinkHeader, Banner } from '../components/headings';
import { GameCard } from '../Home/game_schedule';
import { LocationDetails } from '../Home/game_schedule';
// import Accordion from 'react-bootstrap/Accordion';

console.log(scheduleFall)


const GameScheduleComplete = () => {
  const septemberGames = scheduleFall.Games.September;
  const octoberGames = scheduleFall.Games.October;

  return (
    <div className='container'>
      <ShrinkHeader className='page-title' title={'Fall Schedule'} />
      <h3 className='text-muted text-end me-2 mb-1'>Double click for more info!</h3>
      <div className='GameEvents grid '>
        <Banner title={'September'} />
        {Object.entries(septemberGames).map(([match, game]) => {
          console.log(game)
          return (
            <GameCard key={match} game={game} id={match} />
          )
        }
        )}
      </div>
      <div>
        <Banner title={'October'} />
        {Object.entries(octoberGames).map(([match, game]) => {
          console.log(match)
          return (
            <GameCard key={match} game={game} id={match} />
          )
        })}
      </div>
    </div>
  );
};

export default GameScheduleComplete;