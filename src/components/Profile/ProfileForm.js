import classes from './ProfileForm.module.css';
import {useRef,useContext} from "react"
import { AuthContext } from '../../Store/Auth-tokenContext';
import {useHistory} from "react-router-dom"

const ProfileForm = () => {
  const AuthCntx = useContext(AuthContext)
  const newPswd = useRef()
  const history = useHistory()

  const handlePswdChnage = (event) =>{
    event.preventDefault()
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAFdEypHhRHa6EjCndNFSx1cXVHkos_L0A",{
      method : "POST",
      body : JSON.stringify( {
              idToken :AuthCntx.token,
              password: newPswd.current.value,
              returnSecureToken : false }) ,
      headers : {
        "Content-Type" : "application/json"
      }
    }).then( response =>{
       if(response.ok){
          return response.json()
       }
       else { return response.json().then( (data)=>{
        throw new Error(data.error.message)
       })

       }
    }).then(data=> {console.log(data)})
      .catch(error =>{ 
        alert (`Password Change Failed due to ${error.message}`)
    })
    history.replace("/")
  }
  return (
    <form className={classes.form} onSubmit={handlePswdChnage}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPswd} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
