import React,{useState , useEffect ,useCallback} from "react"

let logOutTimer
export const AuthContext = React.createContext({
    token : '',
    isLoggedIn : false,
    login: (id)=> {} ,
    logout: () => {}
})

export const AuthContextProvider = (props) => {
 const StoredToken = localStorage.getItem("token")
 const [tokenVal,setToken] = useState(StoredToken)

 const isLogin = !!tokenVal

 const handleLogout = useCallback(()=>{
    setToken()
    localStorage.removeItem("token")
    localStorage.removeItem("expiry")
    clearTimeout(logOutTimer)
 },[])
   
 useEffect(()=>{
     let timeLeft
     if(tokenVal){
        timeLeft = localStorage.getItem("expiry") - Date.now()
        if(timeLeft <=60000) {timeLeft = 0}
        logOutTimer = setTimeout(handleLogout, timeLeft)
    }
 },[tokenVal, handleLogout])

 
 const handleLogin = (token, expiryTime) =>{
     localStorage.setItem("token", token)
     localStorage.setItem("expiry", expiryTime)
     logOutTimer = setTimeout(handleLogout, expiryTime - Date.now())
     setToken(token)
 }

 const ContextValue = {
     token:tokenVal,
     isLoggedIn: isLogin,
     login: handleLogin,
     logout:handleLogout
 }
  return (
      <AuthContext.Provider value= {ContextValue}>
          {props.children}
        </AuthContext.Provider>
  )
}

export default AuthContextProvider