// src/components/common/ScrollToTop.jsx

import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to top instantly, overriding any hash
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return null;
};

export default ScrollToTop;