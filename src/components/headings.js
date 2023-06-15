import React, { useState, useEffect } from 'react';

export const ShrinkHeader = () => {
  const [shouldShrink, setShouldShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShouldShrink(true);
      } else {
        setShouldShrink(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <h2 className={`page-heading ${shouldShrink ? 'shrink' : ''}`}>
      Upcoming in September
    </h2>
  );
};
 /*ask why export default doesnt work properly*/

 export const Banner = ({ title }) => (
  <h2 className='page-title' onClick={handleTitleClick}>{title}</h2>);

  const handleTitleClick = () => {
    window.location.reload();
  };
