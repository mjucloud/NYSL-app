import logo from './components/nysl_logo.png'
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import Navbar from './components/Navbar'
import scheduleFall from './components/schedule';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/pages/aboutUs.js';
import Games from './components/pages/gamesInfo';
import RulesnPolicies from './components/pages/rulesNpolicies';
import PhotoBoard from './components/pages/photoBoard';
import SignUp from './components/pages/signUp';
import Home from './components/pages/home';

console.log(scheduleFall)
const GameSchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState('September');

  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const games = scheduleFall.Games[selectedMonth];

  return (
    <div>
      <select value={selectedMonth} onChange={handleChangeMonth}>
        <option value="September">September</option>
        <option value="October">October</option>
      </select>

      {games && (
        <div>
          <h2>{selectedMonth}</h2>
          {Object.entries(games).map(([match, game]) => (
            <div key={match}>
              <h3>{game.Date}</h3>
              <p>Teams: {game.Teams}</p>
              <p>Time: {game.Time}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


const queryClient = new QueryClient();

const App = () => {
  
 return (
  <>
 
  
  <Router>
  <Navbar />
  <GameSchedule />
  </Router>
  
  
  </>
  )
};

export default App;


/*<Routes>
  <Route path='/about-us' exact component={AboutUs} />
  <Route path='/games-info' exact component={Games} />
  <Route path='/rules-and-policies' exact component={RulesnPolicies} />
  <Route path='/photo-board' exact component={PhotoBoard} />
  <Route path='/home' exact component={Home} />
  <Route path='/sign-up' exact component={SignUp} />
  </Routes> */