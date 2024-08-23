import React, { useEffect } from 'react'
import { Layout } from '../components/layout/Layout'
import { useSearch } from '../context/search';
import { Link } from 'react-router-dom';

export const Search = () => {
    const [values, setValues] = useSearch();



    return (
        <Layout title={"Search Products - EcommerceApp"}>
            <div className="container">
                <div className="text-center mt-5">
                    <h1>Search Results</h1>
                    <h6>
                        {
                            values?.results.length < 1 ? "No Products Found" : `Found ${values?.results.length} Product`
                        }
                    </h6>
                    <div className="d-flex flex-wrap mt-4">
                        {
                            values.results?.map((p) => (


                                <div className="card m-3 p-2 product-link" style={{ width: "20 rem" }} >
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top w-" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 30)}...</p>
                                        <p className="card-text">$ {p.price}</p>
                                        <button className="btn btn-primary ms-1">More Details</button>
                                        <button className="btn btn-secondary ms-1">ADD TO CART</button>
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
