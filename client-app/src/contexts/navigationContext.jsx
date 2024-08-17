import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

// eslint-disable-next-line react/prop-types
export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};