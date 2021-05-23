import { useState,useRef,useContext } from 'react';
import { AuthContext } from '../../Store/Auth-tokenContext';
import {useHistory}  from "react-router-dom"
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading,setLoading] = useState(false)
  
  const history = useHistory()
  const AuthCtx = useContext(AuthContext)

  const emailRef = useRef()
  const PswdRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const handleSubmit = (event) =>{
      event.preventDefault()
      const enteredEmail = emailRef.current.value
      const enteredPswd = PswdRef.current.value
      let url
      if(isLogin)
      {
         url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFdEypHhRHa6EjCndNFSx1cXVHkos_L0A"
      }
      else {
        url ="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFdEypHhRHa6EjCndNFSx1cXVHkos_L0A"
      }
      setLoading(true)
      fetch( url,{
          method: "POST",
          body : JSON.stringify({
            email: enteredEmail,
            password: enteredPswd,
            returnSecureToken : true
          }),
          headers:{
            "Content-Type" : "application/json"
          }
          }).then(resp=>{
            setLoading(false)
           if(resp.ok){
              return resp.json()
           }
           else{
              return resp.json().then(data => {
                let errorMsg = "Authentication Failed !!"
                throw new Error(data.error.message);
               })  
           }
         })
         .then(data=> {console.log(data)
           AuthCtx.login(data.idToken, Date.now() + data.expiresIn * 1000)
           history.replace("/")
           })
         .catch( err =>{
          alert(err)
        })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}> 
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref = {emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={PswdRef}/>
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
