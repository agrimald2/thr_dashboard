import {createContext, useState} from "react";

const MainContext = createContext("");

export function ContextProvider({children}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <MainContext.Provider value={{setSidebarOpen, sidebarOpen}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;