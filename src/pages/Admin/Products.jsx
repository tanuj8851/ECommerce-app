import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layout/Layout'
import { AdminMenu } from './../../components/layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


export const Products = () => {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {

        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-products`);
            setProducts(data.product);


        } catch (error) {
            console.log(error);
            toast.error("Something wrong.")
        }
    }


    useEffect(() => {
        getAllProducts();
    }, [])

    return (
        <Layout title={"Products - Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className='text-center'>All Products List</h1>
                        <div className="d-flex flex-wrap">

                            {
                                products?.map((p) => (
                                    <Link key={p._id} className='product-link' to={`/dashboard/admin/product/${p.slug}`}>

                                        <div className="card m-2  " style={{ width: "20 rem" }} >
                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top " alt={p.name} />
                                            <div className="card-body">
                                                <h5 className="card-title">{p.name}</h5>
                                                <p className="card-text">{p.description}</p>

                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
