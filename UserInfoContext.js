import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useState, useContext} from 'react';

const UserInfoContext = createContext({
  token: null,
  name: null,
  email: null,
  id: null,
  storeToken: () => {},
  clearToken: () => {},
  storeName: () => {},
  storeEmail: () => {},
  storeId: () => {},
});

export const useUserInfo = () => useContext(UserInfoContext);

export const UserInfoProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);

  const storeToken = async newToken => {
    try {
      await AsyncStorage.setItem('userToken', newToken);
      setToken(newToken);
    } catch (e) {
      console.log('토큰 저장 중 에러 발생', e);
    }
  };

  // 토큰을 초기화하는 함수
  const clearToken = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // AsyncStorage에서 토큰 제거
      setToken(null); // 상태를 null로 설정
    } catch (e) {
      console.log('토큰 초기화 중 에러 발생', e);
    }
  };

  // 이름 저장
  const storeName = async newName => {
    try {
      await AsyncStorage.setItem('userName', newName);
      setName(newName);
    } catch (e) {
      console.log('이름 저장 중 에러 발생', e);
    }
  };

  // 이메일 저장
  const storeEmail = async newEmail => {
    try {
      await AsyncStorage.setItem('userEmail', newEmail);
      setEmail(newEmail);
    } catch (e) {
      console.log('이메일 저장 중 에러 발생', e);
    }
  };

  // 아이디 저장
  const storeId = async newId => {
    try {
      await AsyncStorage.setItem('userId', newId);
      setId(newId);
    } catch (e) {
      console.log('아이디 저장 중 에러 발생', e);
    }
  };

  return (
    <UserInfoContext.Provider
      value={{
        token,
        name,
        email,
        id,
        storeToken,
        clearToken,
        storeName,
        storeEmail,
        storeId,
      }}>
      {children}
    </UserInfoContext.Provider>
  );
};
