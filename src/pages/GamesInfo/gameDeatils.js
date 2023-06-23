import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import scheduleFall from '../data/JSON/schedule';
import { LocationDetails } from '../Home/game_schedule';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import './gameDetails.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const GameDetails = () => {
  const { id } = useParams();

  // Retrieve the match details based on the ID
  const match = scheduleFall.Games.September[id] || scheduleFall.Games.October[id];



  // Render the match details
  if (match) {
    const { Teams, Date, Time, Location } = match;

    const [team1, team2] = Teams.split('x');
    let pathTeam1 = team1.toLowerCase().trim();
    let pathTeam2 = team2.toLowerCase().trim();
    console.log(pathTeam1)

    const logo1 = require(`../data/IMG/logos/${pathTeam1}.logo.png`)
    const logo2 = require(`../data/IMG/logos/${pathTeam2}.logo.png`)


    return (
      <Card className=' text-center'>
        <Card.Body>
          <Card.Title className='fs-4'>{Date}</Card.Title>
          <Card.Subtitle className='fs-3'>{Time}</Card.Subtitle>
          <div className='ms-0 d-flex align-items-center justify-content-evenly'>
            <Image src={logo1} roundedCircle className='teamLogo' />
            <FontAwesomeIcon icon={faTimes} />
            <Image src={logo2} roundedCircle className='teamLogo' />
          </div>
          <Card.Subtitle className='mb-2 fs-3'>{Teams}</Card.Subtitle>
          <LocationDetails locationRef={Location} isInitiallyVisible={true} className="fs-2" />
        </Card.Body>
      </Card>
    );
  }

  // Render a message if match not found
  return <p>Match not found.</p>;
};

export default GameDetails;


