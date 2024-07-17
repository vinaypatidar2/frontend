import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();

    
    const  getProduct = async() =>{
        try {

            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProducts(data?.product._id, data?.product.category._id )
        } catch (error) {
            // console.log(error);
        }
    }

    const getSimilarProducts = async(pid, cid) =>{
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-products/${pid}/${cid}`)
            setRelatedProducts(data?.products);
        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(()=>{
        if (params?.slug) getProduct();
    }, [params?.slug])
    

    return (
        <Layout>
            <div className='row container mt-2'>
                {/* {JSON.stringify(product, null, 4 )} */}
                <div className='col-md-6'>
                <img
                    height={"400rem"}
                    // width={"400rem"}
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                </div>
                <div className='col-md-6'>
                    <h2>{product.name}</h2>
                    <h5>{product.description}</h5>
                    <h5>Rs. {product.price}</h5>
                    <h5>{product.category?.name}</h5>
                    <button className='btn btn-secondary'
                    //     onClick={()=>{
                    //     setCart([...cart, p]);
                    //     alert("Added");
                    // }}
                    >
                        ADD TO CART
                    </button>
                </div>
            </div>
            <div className='row p-4'> 
                <h1>
                    Similar Products
                </h1>
                <div className="d-flex flex-wrap">
                        {relatedProducts?.map((p) => (
                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    height={"200rem"}
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <h5 className="card-title">{p.price}</h5>

                                    <button 
                                        className='btn btn-primary ms-1' 
                                        onClick={()=>{navigate(`/product/${p.slug}`)}}
                                    >
                                        More Details
                                        </button>
                                    <button className='btn btn-secondary ms-1'>Add to cart</button>
                                </div>
                            </div>
                        
                        ))}
                </div>
            </div>
            
        </Layout>
    )
}

export default ProductDetails;