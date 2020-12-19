import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout'
import { getPurchaseHistory } from './apiUser';
import moment from 'moment';


const Dashboard = () =>{

    const [history, setHistory] = useState([])

    const {user:{_id, email, name, role}} = isAuthenticated();

    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId,token).then(data=> {
            if (data.error) {
                console.log(data.error);
            }
            else{
                setHistory(data)
            }
        })
    }

    useEffect(() => {

        init(_id,token)
   
    }, [])

    const userLinks = () =>{
        return (
            <div className="card">
                  <h3 className="card-header">User Links</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/cart">My Cart</Link>
                </li>
                <li className="list-group-item">    
                  <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>

                </li>
                </ul>

            </div>
        )
    }

    const userInfo = () => (
        <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role === 1  ? 'Admin' : "Register"}</li>
        </ul>
    </div>
    )

    const purchaseHistory = (history) => (

        <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className="list-group">
            <li className="list-group-item">
                {
                    history.map((h,i)=>(
                     <div>
                         <hr/>
                         {h.products.map((p,i)=>{
                             return(
                                <div key={i}>

                                    <h6>Product name: {p.name}</h6> 
                                    <h6>Product price: {p.price}</h6> 
                                    <h6>Product date: {moment(p.createdAt).fromNow()}</h6> 
                                    <hr/>


                                    </div>
                             )
                         })}
                     </div>
                    ))
                }
            </li>
         
        </ul>
    </div>

    )


    


    return (

        <div className="user-dashboard mt-5">
            <h1>Dashboard</h1>
        

        <div className="row mt-5">

           
            
        
            <div className="col-3">
            {userLinks()}

            </div>
            <div className="col-9">
            {userInfo()}
            {purchaseHistory(history)}

            </div>
        </div>
     

        </div>
       

        
      
        


    
    )
}

export default Dashboard;
