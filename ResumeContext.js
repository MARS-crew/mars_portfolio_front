import React, { createContext, useContext, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
    const [resumeData, setResumeData] = useState({
        itemHeights: [],
    });

    const setHeight = (index, height) => {
        setResumeData((prevData) => {
            const newItemHeights = [...prevData.itemHeights];
            newItemHeights[index] = height;
            return { ...prevData, itemHeights: newItemHeights };
        });
    };

    return (
        <ResumeContext.Provider value={{ resumeData, setHeight }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResumeContext must be used within a ResumeProvider');
    }
    return context;
};
