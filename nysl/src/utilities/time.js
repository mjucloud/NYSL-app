export const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

export const courseConflict = (course1, course2) => (
  course1.term === course2.term
  && timeConflict(course1, course2));

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

