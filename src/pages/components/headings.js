import React, { useState, useEffect } from 'react';

export const ShrinkHeader = ({ title }) => {
  const [shouldShrink, setShouldShrink] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.0) {
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
      { title }
    </h2>
  );
};
 /*ask why export default doesnt work properly*/

 export const Banner = ({ title }) => (
  <div>
  <h2 className='fw-bold mt-4 mb-1 text-center'>{title}</h2>

  </div>)




 export const CopyRightsFooter = () => (
    
    <footer>
      <div className='footer'>Copy Rights & Autorization © 2021</div>
    </footer>
    
  )