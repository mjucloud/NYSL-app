

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from "react-query";
import './App.css';
import { CopyRightsFooter } from './pages/components/headings';
import Navbar from './pages/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './pages/AboutUs/aboutUs.js';
import GameScheduleComplete from './pages/GamesInfo/gamesInfoPage';
import RulesAndPolicies from './pages/RulesNPolicies/rulesNprotocols';
import { MainHomePage } from './pages/Home/home'
import { GameDetails } from './pages/GamesInfo/gameDetails';
import { AuthContextProvider, UserAuth} from './pages/SignIn/chat-auth';
import { SignIn } from './pages/SignIn/signIn';
import ChatScreen from './pages/MessageBoard/messageBoard';
import { auth } from './firebase';




const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, set] = useState(false)
 const loggedUser = auth.currentUser;
 if ( loggedUser ){
  set(true)
 }
 console.log(auth.currentUser)
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Router>
              <Navbar />
              <Routes>
                <Route path="/games-info" element={<GameScheduleComplete />} />
                <Route exact path="/" element={<MainHomePage />} />
                <Route path='/game/:id' element={<GameDetails />} />
                <Route path='/rules-and-policies' element={<RulesAndPolicies />} />
                <Route path='/about-us' element={<AboutUs />} />
                <Route path='/sign-in' element={<SignIn />} />
                <Route path="/game/:matchId/chat" element={<ChatScreen />} />
              </Routes>
              <CopyRightsFooter />
            
          </Router>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  )
};

export default App;


/*<Routes>
  <Route path='/about-us' exact component={AboutUs} />
  
  <Route path='/rules-and-policies' exact component={RulesnPolicies} />
  <Route path='/photo-board' exact component={PhotoBoard} />
  <Route path='/' exact component={Home} />
  <Route path='/sign-in' exact component={SignIn} />
  </Routes> 
  import PhotoBoard from './pages/PhotoBoard/photoBoard';
  import SignUp from './pages/signUp';


*/