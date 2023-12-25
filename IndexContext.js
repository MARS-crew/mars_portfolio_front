import React, { createContext, useState, useContext, useEffect } from 'react';

const IndexContext = createContext();

const IndexProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);  //세로 스와이프
  const [horizontalIndex, setHorizontalIndex] = useState(0);


  const changeIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };
  const changeHorizontalIndex = (newIndex) => {
    setHorizontalIndex(newIndex);
  };
  useEffect(() => {
    console.log("현재 수직 인덱스 : ", currentIndex, " | 현재 수평 인덱스 : ", horizontalIndex);
  }, [currentIndex, horizontalIndex]);

  return (
    <IndexContext.Provider value={{ currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex }}>
      {children}
    </IndexContext.Provider>
  );
};

const useIndexContext = () => useContext(IndexContext);

export { IndexProvider, useIndexContext };