import React,{useState,useEffect} from 'react';
import { getProducts } from './apiCore';
import Card from './Card';
import Layout from './Layout'
import Search from './Search';

const Home =()=> {

    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState(false)

    const loadProductBySell = () => {
      getProducts('sold').then(data => {
        if (data.error) {
          setError(data.error)
          
        }else{
          setProductsBySell(data)
        }
      })
    }

    const loadProductByArrival = () => {
      getProducts('createdAt').then(data => {
        if (data.error) {
          setError(data.error)
          
        }else{
          setProductsByArrival(data)
        }
      })
    }

    useEffect(() => {
       loadProductByArrival()
       loadProductBySell()
    }, [])

    return(
      <>
       
        
        <Layout 
        title="Home" 
        description="Welcome to Shoptobuy ecommerce site "
        className="container-fluid"
        >

        

        <div className="seller">

        <Search/>

        

        <h2 className="mb-4"> Best Sellers</h2>
           <div className="row ">
           {productsBySell.map((product,i)=> (
           <div key={i} className="col-3 mb-3">
           <Card  product={product}/>
           </div>
         ))}
           </div>

           <hr/>

         <h2 className="mb-4 "> new Arrivals</h2>
          <div className="row" >
          {productsByArrival.map((product,i)=> (
            <div key={i} className="col-3 mb-3">
           <Card  product={product}/>
           </div>
         ))}
          </div>
        </div>

        </Layout>

        </>
    )
}

export default Home
