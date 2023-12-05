// MyContext.js
import React, {createContext, useState} from 'react';
import Attachment from '../mars_portfolio_front/assets/images/Attachment.png';
import emptyImg from '../mars_portfolio_front/assets/images/emptyImg.png';
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
