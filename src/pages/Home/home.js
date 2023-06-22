import { GameSchedule } from "./game_schedule"
import { RainSchedule } from "./rain_schedule"
import { Banner } from "../components/headings"
import React from "react"
export const MainHomePage = () => {
  console.log(<RainSchedule />)
  return (
    <div className="ms-2 me-2">
    <GameSchedule />
    <Banner title={'Check the Weather Forecast!'} />
    <RainSchedule />
  </div>
  )
};
export default MainHomePage;

