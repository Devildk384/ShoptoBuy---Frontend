import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth';
import Layout from '../core/Layout'


const AdminDashboard = () =>{

    const {user:{_id, email, name, role}} = isAuthenticated();

    const adminLinks = () =>{
        return (
            <div className="card">
                  <h3 className="card-header">Admin Links</h3>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link className="nav-link" to="/create/category">
                        Create Category
                    </Link>
                </li>
                <li className="list-group-item">    
                  <Link className="nav-link" to="/create/product">Create Product</Link>

                </li>

                <li className="list-group-item">    
                  <Link className="nav-link" to="/admin/orders">View Orders</Link>

                </li>
                <li className="list-group-item">    
                  <Link className="nav-link" to="/admin/products">Manage Products</Link>

                </li>
                </ul>

            </div>
        )
    }

    const adminInfo = () => (
        <div className="card mb-5">
        <h3 className="card-header">Admin Information</h3>
        <ul className="list-group">
            <li className="list-group-item">{name}</li>
            <li className="list-group-item">{email}</li>
            <li className="list-group-item">{role === 1  ? 'Admin' : "Register"}</li>
        </ul>
    </div>
    )



    


    return (

    
        <div className="user-dashboard mt-5 ml-3">
        <h1>Dashboard</h1>

       

   
        <div className="row mt-5 ml-3 mr-3">
            <div className="col-3">
            {adminLinks()}

            </div>
            <div className="col-9">
            {adminInfo()}
            

            </div>
        </div>

        </div>

 
      

       
     
      
        


        
    )
}

export default AdminDashboard;
