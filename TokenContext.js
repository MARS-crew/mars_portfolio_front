import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext({
  token: null,
  storeToken: () => { },
});

export const useToken = () => useContext(TokenContext);

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const storeToken = async newToken => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
    } catch (e) {
      console.log('토큰 저장 중 에러 발생', e);
    }
  };

  return (
    <TokenContext.Provider value={{ token, storeToken }}>
      {children}
    </TokenContext.Provider>
  );
};
