import scheduleFall from '../schedule'

const Main = () => {
  <UpcomingEvents />
}

const UpcomingEvents = () => {
  const gamesInfo = scheduleFall.Games
  console.log(gamesInfo)
  gamesInfo.map((item, index) => {
    return (
      <div>
       Upcoming Events 
       <div>
        {item[0]}
        {item[1]}
       </div>
      </div>
    )
  })
}