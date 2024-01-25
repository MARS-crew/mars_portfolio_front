// MyContext.js
import React, {createContext, useState} from 'react';
const MyContext = createContext();

const MyProvider = ({children}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ext, setExt] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');

  return (
    <MyContext.Provider
      value={{
        title,
        setTitle,
        content,
        setContent,
        ext,
        setExt,
        portfolioUrl,
        setPortfolioUrl,
      }}>
      {children}
    </MyContext.Provider>
  );
};

export {MyContext, MyProvider};
