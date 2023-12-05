import React, { createContext, useState, useContext, useEffect } from 'react';

const IndexContext = createContext();

const IndexProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const changeIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };
  // useEffect(() => {
  //   console.log("현재페이지 : ", currentIndex);
  // }, [currentIndex]);

  return (
    <IndexContext.Provider value={{ currentIndex, changeIndex, }}>
      {children}
    </IndexContext.Provider>
  );
};

const useIndexContext = () => useContext(IndexContext);

export { IndexProvider, useIndexContext };