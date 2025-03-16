import axios from "axios";
import { Children, createContext, useContext, useEffect, useState } from "react";

const PinContext = createContext();

export const PinProvider = ({children}) => {
    const [pins, setPins] = useState([])
    const [loading, setLoading] = useState(true)
    
    async function fetchPins() {
        try {
            const {data} = await axios.get("/api/pin/all");
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
      fetchPins();
    }, [])
    
    return <PinContext.Provider value={{pins, loading}}>{children}</PinContext.Provider>
};

export const PinData = () => {
    return useContext(PinContext);
}