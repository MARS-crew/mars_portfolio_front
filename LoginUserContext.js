import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import {getUserInfoByToken} from "./api/v1/user";
import portfolio from "./views/screens/Portfolio/Portfolio";


const UserContext = createContext({
    user: null,
    storeUser: () => { },
})

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const storeUser = async token => {
        getUserInfoByToken(token)
        .then(async function (response) {
            const extractedData = response.data.data.map(item => ({
                member_id: item.member_id,
            }));
            console.log("user: ", extractedData[0].member_id);
            setUser(extractedData[0].member_id);
            await AsyncStorage.setItem('loginUser', extractedData[0].member_id.toString());

        })
        .catch(function (e) {
            throw e;
        });
    };

    return (
        <UserContext.Provider value={{ user, storeUser }}>
            {children}
        </UserContext.Provider>
    );
};





