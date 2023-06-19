

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import { CopyRightsFooter } from './pages/components/headings';
import Navbar from './pages/Navbar/Navbar'
import { GameSchedule } from './pages/Home/game_schedule'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/aboutUs.js';
import GameScheduleComplete from './pages/GamesInfo/gamesInfo';
import RulesAndPolicies from './pages/rulesNprotocols';
import PhotoBoard from './pages/photoBoard';
import SignUp from './pages/components/signUp';
import Home from './pages/Home/home';


console.log(CopyRightsFooter)


const queryClient = new QueryClient();

const App = () => {
  
 return (
  <>
 
 <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/games-info" element={<GameScheduleComplete />} />
          <Route path="/" element={<GameSchedule />} />
          <Route path='/rules-and-policies' element={<RulesAndPolicies />} />
        </Routes>
        
      </div>
    </Router>
  
  </>
  )
};

export default App;


/*<Routes>
  <Route path='/about-us' exact component={AboutUs} />
  
  <Route path='/rules-and-policies' exact component={RulesnPolicies} />
  <Route path='/photo-board' exact component={PhotoBoard} />
  <Route path='/' exact component={Home} />
  <Route path='/sign-up' exact component={SignUp} />
  </Routes> */


