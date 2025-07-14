import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePrevious from './usePrevious';

const useLocationChange = (action) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    action(location, prevLocation);
  }, [location]);
};
export default useLocationChange;
