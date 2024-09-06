import React ,{useContext,createContext, useState, useEffect} from "react"
import {getCurrentUser} from "../lib/appwrite"
let GlobalContext=React.createContext({userx:null,isLogged:false});
export const useGlobalContext = () => useContext(GlobalContext);
console.log("GlobalContext",GlobalContext);

let GlobalProvider=({children})=>{
    let[userx,setUserx]=useState(null);
    let[isLogged,setIsLogged]=useState(false);
    useEffect(()=>{
        console.log("current user")
        getCurrentUser()
       .then((res)=>{
            setIsLogged(true);
            setUserx(res);
        }).catch((err)=>{
            setIsLogged(false);
            setUserx(null)
        })
    },[]);
    
    <GlobalContext.Provider value={{userx,isLogged:true}}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalProvider;