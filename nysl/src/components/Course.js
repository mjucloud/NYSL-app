import { hasConflict } from '../utilities/time.js';
import { useNavigate } from "react-router-dom";
export const Course = ({ course, selected, setSelected }) => {
  let navigate = useNavigate();
  let isSelected = selected.includes(course);
  let isDisabled = !isSelected && hasConflict(course, selected);
  const style = {
    backgroundColor: isSelected ? 'lightgreen' : isDisabled ? 'lightgrey' :  'white'
  };

  const meets = course.meets.split(' ');
  return (
    <div className="card m-1 p-2" 
      style={style}
      onClick={isDisabled ? null : () =>  setSelected(toggle(course, selected))}
      onDoubleClick={() => navigate('/edit', { state: course })}>
      <div className="card-body">
        <div className="card-title">{ course.term } CS {course.number }</div>
        <div className="card-text">{ course.title }</div>
        <div className="card-text">Meets: { meets[1] } { getFullDayNames(meets[0].split(/(?=[A-Z])/)).join('/') }</div>
      </div>
    </div>
  );
};


  const toggle = (x, lst) => (
    lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
  );

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