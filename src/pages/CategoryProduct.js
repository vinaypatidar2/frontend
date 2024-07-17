import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);


    const getProductByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);

            setProducts(data?.products);
            setCategory(data?.category);

        } catch (error) {
            // console.log(error);
        }
    }

    useEffect(() => {
        if (params?.slug)
            getProductByCategory();
    }, [params])



    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6 ' >{category.name}
                        <div className="d-flex flex-wrap">
                            {products?.map((p) => (
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
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>

                                        <button
                                            className='btn btn-primary ms-1'
                                            onClick={() => { navigate(`/product/${p.slug}`) }}
                                        >
                                            More Details
                                        </button>
                                        <button className='btn btn-secondary ms-1'>Add to cart</button>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>
            </div>


        </Layout>
    );
};

export default CategoryProduct;