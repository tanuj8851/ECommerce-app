import React, { useState, useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';


export const ProductDetails = () => {

    const params = useParams();
    const [products, setProducts] = useState([]);
    const [relatedProducts, setRealtedProducts] = useState([]);


    useEffect(() => {
        if (params?.slug) getProduct()
    }, [params?.slug])

    const getProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params?.slug}`);
            setProducts(data?.Product)

            getSimilarProduct(data?.Product[0]._id, data?.Product[0].category._id)

        } catch (error) {
            console.log(error);

        }
    }



    // similar products 
    const getSimilarProduct = async (pid, cid) => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRealtedProducts(data?.products)
        } catch (error) {
            console.log(error);

        }
    }


    return (
        <Layout title={"Product descripton"}>
            <div className="row container mt-5">
                <div className="col-md-6">
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${products[0]?._id}`}
                        className="card-img-top "
                        alt={products[0]?.name} />
                </div>
                <div className="col-md-6">
                    <h1 className="text-center">Product Details</h1>
                    <h6 className='fs-3 mt-5'>Name : {products[0]?.name}</h6>
                    <h6 className='fs-3'>Description : {products[0]?.description}</h6>
                    <h6 className='fs-3 card-name-price'>Price : $ {products[0]?.price}</h6>
                    <h6 className='fs-3'>Category : {products[0]?.category.name}</h6>
                    <button className="btn btn-primary mt-2 fs-4">ADD TO CART</button>
                </div>
            </div>
            <hr />
            <div className="row container mt-5"><h1>SIMILAR PRODUCTS</h1>
                {relatedProducts.length < 1 && <h4 className='text-center'>No Similar Products Found.   </h4>}
                <div className="d-flex flex-wrap  ">
                    {
                        relatedProducts?.map((p) => (
                            <div className="card m-3 p-2 product-link " key={p._id} style={{ width: "20 rem" }} >
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top " alt={p.name} />
                                <div className="card-body">
                                    <h5 className="card-title fs-1">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text card-name-price">$ {p.price}</p>
                                    <button className="btn btn-primary ms-1">ADD TO CART</button>
                                </div>
                            </div>

                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
