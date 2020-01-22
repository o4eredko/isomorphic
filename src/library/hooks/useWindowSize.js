import React from 'react';

function useWindowSize() {
  const [size, setSize] = React.useState({
    width: process.browser && window.innerWidth,
    height: process.browser && window.innerHeight,
  });

  const onResize = () => {
    setSize({
      width: process.browser && window.innerWidth,
      height: process.browser && window.innerHeight,
    })
  };

  React.useEffect(() => {
    window.addEventListener('resize', onResize, true);
    return () => {
      window.removeEventListener('resize', onResize, true);
    };
  }, []);

  return size;
};

export default useWindowSize;
