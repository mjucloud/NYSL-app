import React, { useState}from 'react';
import { useParams } from 'react-router-dom';
import scheduleFall from '../data/JSON/schedule';
import { LocationDetails } from '../Home/game_schedule';
import Card from 'react-bootstrap/Card';
import { Image } from 'react-bootstrap';
import { Row , Col } from 'react-bootstrap';
import './gameDetails.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export const GameDetails = () => {
  const { id } = useParams();
  const [isMapVisible, setIsMapVisible] = useState(true);
  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };
 
  // Retrieve the match details based on the ID
  const match = scheduleFall.Games.September[id];

  const handleMapToggle = (mapVisible) => {
    setIsMapVisible(mapVisible);
  };

  // Render the match details
  if (match) {
    const { Teams, Date, Time, Location } = match;
    
    const [team1, team2] = Teams.split('x');
    let  pathTeam1 = team1.toLowerCase().trim();
    let pathTeam2 = team2.toLowerCase().trim();
    console.log(pathTeam1)

    const logo1 = require(`../data/IMG/logos/${pathTeam1}.logo.png`)
    const logo2 = require(`../data/IMG/logos/${pathTeam2}.logo.png`)


    return (
      <Card className='gameCard'>
      <Card.Body>
        <Card.Title>{Date}</Card.Title>
        <Card.Subtitle>{Time}</Card.Subtitle>
       <Row  sm={3} lg={5}>
         <Col sm={1} md={2} className='teamLogo'>
         <Image src={ logo1 } roundedCircle  className='teamLogo'/>
         </Col>
         <FontAwesomeIcon icon={faTimes} />
         <Col sm={1} md={2}>
         <Image src={ logo2 } roundedCircle className='teamLogo'/>
         </Col>
       </Row>
       <div className='text-center'>
       <Card.Subtitle>{Teams}</Card.Subtitle>
        <LocationDetails locationRef={Location} isInitiallyVisible={true}/> 
        </div>
      </Card.Body>
      </Card>
    );
  }

  // Render a message if match not found
  return <p>Match not found.</p>;
};

export default GameDetails;


