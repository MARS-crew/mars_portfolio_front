import React, { createContext, useState, useContext, useEffect } from 'react';

const LoadingContext = createContext({
    loading: true,
    changeLoading: () => { }
});

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const changeLoading = () => {
        setLoading(!loading);
    };
    useEffect(() => {
        console.log("로딩: ", loading);
    }, [loading]);

    return (
        <LoadingContext.Provider
            value={{ loading, changeLoading }}>
            {children}
        </LoadingContext.Provider >
    );
};