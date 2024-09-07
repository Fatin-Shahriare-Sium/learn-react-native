import React ,{useContext,createContext, useState, useEffect} from "react";
import {getCurrentUser} from "../lib/appwrite";

let GlobalContext=createContext({userx:null,isLogged:false});
export const useGlobalContext = ()=>useContext(GlobalContext);
console.log("GlobalContext",GlobalContext);

let GlobalProvider=({children})=>{
    let globalAuth =useContext(GlobalContext);
   
    
    let [userx,setUserx]=useState(null);
    
    let [isLogged,setIsLogged]=useState(false);
    useEffect(()=>{
        
        getCurrentUser()
       .then((res)=>{
            setUserx(res);
            setIsLogged(true);
            console.log("global auth useffet",res);
        }).catch((err)=>{
            setIsLogged(false);
            setUserx(null)
        })
    },[]);
    
  
       return(
        <GlobalContext.Provider value={{userx,isLogged}}>
        {children}
</GlobalContext.Provider>
       )
    
}

export default GlobalProvider;