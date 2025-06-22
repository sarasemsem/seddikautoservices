import React, { createContext, useContext, useState } from 'react';

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [stock, setStock] = useState([]);

  return (
    <StockContext.Provider value={{ stock, setStock }}>
      {children}
    </StockContext.Provider>
  );
};

export const useStock = () => useContext(StockContext);
