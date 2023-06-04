import React, {useEffect, useState} from 'react';
import { CourseList } from './components/CourseList.js';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const Banner = ({ title }) => (
  <h1>{title}</h1>);




const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;
const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};
const mapValues = (fn, obj) => (
  Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, fn(value)]))
);

const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTimes, schedule.courses)
});

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php'; 
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};



const Main = () => {
  const { data: schedule, isLoading, error } = useQuery('schedule', fetchSchedule);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <Banner title="Northside Youth Soccer League" />
      {schedule && <CourseList courses={schedule.courses} />}
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;


/*const getFullDayName = day => {
  const daysMap = {
    M: 'Monday',
    Tu: 'Tuesday',
    W: 'Wednesday',
    Th: 'Thursday',
    F: 'Friday',
    S: 'Saturday',
    U: 'Sunday',
  };
  return daysMap[day] || day;
};

const Course = ({ course }) => (
  <div className="card">
    <div className="card-body">
      <div className="card-title">{getCourseTerm(course)} CS {getCourseNumber(course)}</div>
      <div className="card-text">Meets: {course.meets.split(' ')}</div>
      <div className="card-text">{course.title}</div>
    </div>
  </div>
);
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
.map(day => getFullDayName(day)).join(',')}

export default App;
const getFullDayNames = days => {
  const daysMap = {
    M: 'Monday',
    Tu: 'Tuesday',
    W: 'Wednesday',
    Th: 'Thursday',
    F: 'Friday',
    S: 'Saturday',
    U: 'Sunday',
  };

  return days.map(day => daysMap[day] || day);
};

<div className="card-text">Meets: { meetings[1] } { getFullDayNames(meetings[0].split(/(?=[A-Z])/)).join('/') }</div>
*/