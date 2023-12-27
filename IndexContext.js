import React, { createContext, useState, useContext, useEffect } from 'react';

const IndexContext = createContext();

const IndexProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);  //세로 스와이프
  const [horizontalIndex, setHorizontalIndex] = useState(0);
  const [dataIndex, setDataIndex] = useState(0);
  const [selectedMemId, setSelectedMemId] = useState(0);


  const changeIndex = (newIndex) => {
    setCurrentIndex(newIndex);
  };
  const changeHorizontalIndex = (newIndex) => {
    setHorizontalIndex(newIndex);
  };
  const changeDataIndex = (newIndex) => {
    setDataIndex(newIndex);
  }
  const changeSelectedMemId = (newId) => {
    setSelectedMemId(newId);
  }
  useEffect(() => {
    console.log("현재 수직 인덱스 : ", currentIndex, " | 현재 수평 인덱스 : ", horizontalIndex, " | 선택된 멤버 : ", selectedMemId, " | 데이터인덱스 : ", dataIndex);
  }, [currentIndex, horizontalIndex, selectedMemId, dataIndex]);

  return (
    <IndexContext.Provider value={{ currentIndex, changeIndex, horizontalIndex, changeHorizontalIndex, dataIndex, changeDataIndex, selectedMemId, changeSelectedMemId }}>
      {children}
    </IndexContext.Provider>
  );
};

const useIndexContext = () => useContext(IndexContext);

export { IndexProvider, useIndexContext };