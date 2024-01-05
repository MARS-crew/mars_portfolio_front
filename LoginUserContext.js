import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';


const UserContext = createContext({
    user: null,
    storeUser: () => { },
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const storeUser = async token => {
        try {
            const response = await axios.get('http://api.mars-port.duckdns.org/api/v1/userbytoken', {
                headers: {
                    Authorization: token,
                },
            });
            const extractedData = response.data.data.map(item => ({
                member_id: item.member_id,
            }));
            console.log("user: ", extractedData[0].member_id);
            setUser(extractedData[0].member_id);
            await AsyncStorage.setItem('loginUser', extractedData[0].member_id.toString());

        } catch (e) {
            console.log("login user 저장 중 에러 발생", e);
        }
    };

    return (
        <UserContext.Provider value={{ user, storeUser }}>
            {children}
        </UserContext.Provider>
    );
};
