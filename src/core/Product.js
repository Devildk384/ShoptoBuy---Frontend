import React,{useState,useEffect} from 'react'
import Layout from './Layout';
import { listRelated, read} from './apiCore'
import Card from './Card'



function Product(props) {

   const [product, setProduct] = useState({});
   const [relatedProduct, setRelatedProduct] = useState([]);
   const [error, setError] = useState(false);

   const loadSingleProduct = productId => {
       read(productId).then(
           data => {
               if (data.error) {
                   setError(data.error)
                   
               }else {
                   setProduct(data);
                   listRelated(data._id).then(data => {
                       if (data.error) {
                           setError(data.error);
                           
                       }else{
                           setRelatedProduct(data)
                       }
                   }

                   )
               }
           });
   };

    

   useEffect(() => {

    const productId = props.match.params.productId;
    loadSingleProduct(productId)
  
   }, [props])

    return(
        <Layout 
        title={product && product.name} 
        description={product && product.description && product.description.substring(0,100)}
        className="container-fluid mt-5"
        
        >
        
        <div className="seller1">

               <div className="mb-5" style={{maxHeight:'50%', maxWidth:'80%', margin :"0 25%"}} >
               {product && product.description && <Card product={product} showViewProductButton={false} />}
        
               </div>

               <hr/>

               <h4>Related products</h4>
               <div className="row mt-5">
                   {relatedProduct.map((p,i) => (
                       <div className="col-3 mb-3">
                           <Card key={i} product={p} />
                       </div>
                   ))}
               </div>
              
            



        </div>
        

        
        

        </Layout>
    );
}

export default Product
