import React from 'react';
import {Link, withRouter} from "react-router-dom";
import {signout, isAuthenticated} from "../auth/index"
import { itemTotal } from './CartHelpers';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import "./Menu.css"

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {
            color: "#ff9900"
         }      
    }else{
        return {color: '#ffffff'}
    }
}

const Menu = ({history}) => {
    return (
        <div >
           <ul className="nav">

              <div className="nav-logo">
              <li className="nav-item">
                    <Link className="nav-link" style={{color: "#FFFFFF"}} to="/">ShoptoBuy</Link>
               </li>
              </div>

               

                <div className="nav-mid">

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
               </li>

               <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
               </li>


                </div>

                <div className="nav-right">

                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
               </li>
               )}

               {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
               </li>
               )}

               <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/cart')} to="/cart">

                    
                    
                    {" "}  <ShoppingCartIcon/> <sup><small className="cart-badge">{itemTotal()}</small></sup>
                    </Link>
               </li>
              

               {!isAuthenticated() && (
                   <React.Fragment>
                   <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
               </li>
               <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/signup')} to="/signup">Signup</Link>
               </li>
                   </React.Fragment>
               )}
           
           {isAuthenticated() && (
            <li className="nav-item">
                    <span className="nav-link" style={{cursor:"pointer", color: "#ffffff" }}
                    
                     onClick={() => signout(()=>{
                         history.push("/")
                     }) }>
                     Signout</span>
               </li>
           )}

                </div>

         

           
            
           </ul>
            
        </div>
    )
}

export default withRouter(Menu)
