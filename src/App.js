

import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import { CopyRightsFooter } from './pages/components/headings';
import Navbar from './pages/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs/aboutUs.js';
import GameScheduleComplete from './pages/GamesInfo/gamesInfoPage';
import RulesAndPolicies from './pages/RulesNPolicies/rulesNprotocols';
import PhotoBoard from './pages/PhotoBoard/photoBoard';
import SignUp from './pages/signUp';
import {MainHomePage} from './pages/Home/home'
import { GameDetails } from './pages/GamesInfo/gameDeatils';


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
          <Route exact path="/" element={<MainHomePage />} />
          <Route path='/game/:id' element={<GameDetails />} />
          <Route path='/rules-and-policies' element={<RulesAndPolicies />} />
          <Route path='/about-us' element={<AboutUs/>} />
        </Routes>
        <CopyRightsFooter />
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


