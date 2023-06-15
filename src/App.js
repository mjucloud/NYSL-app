

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import Navbar from './components/Navbar'
import { Banner } from './components/headings';
import { GameSchedule } from './components/game_schedule'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/pages/aboutUs.js';
import GameScheduleComplete from './components/pages/gamesInfo';
import RulesnPolicies from './components/pages/rulesNpolicies';
import PhotoBoard from './components/pages/photoBoard';
import SignUp from './components/pages/signUp';
import Home from './components/pages/home';




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
        </Routes>
        <Banner title={'Sign Up'} />
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


