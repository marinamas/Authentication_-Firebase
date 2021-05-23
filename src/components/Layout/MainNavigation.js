import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import {useContext} from "react"
import { AuthContext } from '../../Store/Auth-tokenContext';

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext)
  const islogged = AuthCtx.isLoggedIn
  
  const LogOut =AuthCtx.logout

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          { !islogged && (<li>
            <Link to='/auth'>Login</Link>
          </li>)}
          { islogged && (
          <li>
            <Link to='/profile'>Profile</Link>
          </li>)}
          {islogged &&
          (<li>
            <button onClick={LogOut}>Logout</button>
          </li> )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
