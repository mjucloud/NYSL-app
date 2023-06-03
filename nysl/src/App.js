import React, {useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const Banner = ({ title }) => (
  <h1>{title}</h1>
);
 

const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);
const TermButton = ({term, setTerm, checked}) => (
  <>
    <input type="radio" id={term} className="btn-check" checked={checked} autoComplete="off"
      onChange={() => setTerm(term)} />
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
    { term }
    </label>
  </>
);

const TermSelector = ({term, setTerm}) => (
  <div className="btn-group">
  { 
    Object.values(terms).map(value => (
      <TermButton key={value} term={value} setTerm={setTerm} checked={value === term} />
    ))
  }
  </div>
);

const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => ( 
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);
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
const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php'; 
  const response = await fetch(url);
  if (!response.ok) throw response;
  return addScheduleTimes(await response.json());
};

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);
const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isDisabled? 'lightgrey' : isSelected ? 'lightgreen' : 'white'
  };
  console.log(course.meets.split(' '))
  const meets = course.meets.split(' ')
  return (
    <div className="card m-1 p-2" 
      style={style}
      onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}>
      <div className="card-body">
        <div className="card-title">{ getCourseTerm(course) } CS { getCourseNumber(course) }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">Meets: { meets[1] } { getFullDayNames(meets[0].split(/(?=[A-Z])/)).join('/') }</div>
      </div>
    </div>
  );
};

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);
const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Spring');
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
 return (
  <>
   <TermSelector term={term} setTerm={setTerm}/> 
   <div className="course-list">
     {termCourses.map((course) => (
     <Course key={course.id} course={course} 
     selected={selected} setSelected={ setSelected }/>
     ))}
   </div>
 </>);
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