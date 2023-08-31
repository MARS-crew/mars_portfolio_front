import React, {createContext, useContext, useState} from 'react';

const PageIndexContext = createContext();

export const usePageIndex = () => {
  return useContext(PageIndexContext);
};

export const PageIndexProvider = ({children}) => {
  const [pageIndex, setPageIndex] = useState(0);

  const value = {
    pageIndex,
    setPageIndex,
  };

  return (
    <PageIndexContext.Provider value={value}>
      {children}
    </PageIndexContext.Provider>
  );
};
