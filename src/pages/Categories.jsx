import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { Link } from 'react-router-dom';
import useCategory from '../components/hooks/useCategory';


export const Categories = () => {

    const categories = useCategory();

    return (
        <Layout title={"Categories - Ecommcerce App"}>

            <div className="container">
                <div className="row">
                    {
                        categories?.map((c) => (
                            <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                                <Link to={`/category/${c.slug}`} className='btn cat-btn'>
                                    {c.name}
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}
