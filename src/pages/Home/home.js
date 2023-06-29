import { GameSchedule } from "../GamesInfo/game_schedule"
import { RainSchedule } from "./rain_schedule"
import { Banner } from "../components/headings"
import React from "react";
import '../GamesInfo/game_shcedule.css';


const WeatherSectionIntro = () => {
  return (
    <div className="weatherIntro">
      <Banner title={'Check the Weather Forecast!'} />
      <p className='ml-3 text-muted mb-0 mt-2'> Keep in mind that <span>ALL MATCHES ARE OUTDOORS.</span></p>
      <p className='ml-3 text-muted'> Therefore Rain Forecast in days of the match will result in <span>POSTPONEMENT.</span></p>
    </div>
  )
}
export const MainHomePage = () => {
  return (
    <div className="ms-2 me-2 ">
      <GameSchedule />
      <WeatherSectionIntro />
      <RainSchedule />
    </div>
  )
};
export default MainHomePage;

