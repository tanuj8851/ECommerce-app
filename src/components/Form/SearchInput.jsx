import React, { useState } from 'react'
import { useSearch } from '../../context/search';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

export const SearchInput = () => {
    const navigate = useNavigate();

    const [values, setValues] = useSearch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data.results });
            navigate("/search")
        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <form role='search' className="d-flex me-5" onSubmit={handleSubmit}>
                <input type="search" className="form-control me-2 " placeholder='Search' aria-label='Search' value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className="btn btn-outline-success" type='submit'>Search</button>
            </form>
        </div>)
}
