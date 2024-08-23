import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { TiShoppingCart } from "react-icons/ti";
import { useAuth } from '../../context/Auth';
import toast from "react-hot-toast";
import { SearchInput } from '../Form/SearchInput';
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import axios from 'axios';

export const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [categories, setCategories] = useState([])


    //get all category
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`, { token: auth?.token });
            if (data?.success) {
                setCategories(data?.category)

            }

        } catch (error) {
            console.log(error);
            toast.error("Something wrong in getting category.")
        }
    }

    useEffect(() => {

        if (auth.token) {
            getAllCategory()
        }

    }, [auth.token])
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ""
        })
        localStorage.removeItem("auth")
        toast.success("Logout Successfully");
    }


    return (

        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand" >
                            <TiShoppingCart />  E-Commerce
                        </Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <SearchInput />

                            <li className="nav-item">
                                <NavLink to="/" className="nav-link " href="#">Home</NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown"
                                >Categories</Link>
                                <ul className="dropdown-menu">
                                    <li >
                                        <Link className="dropdown-item" to={`/categories`}>ALl Categories</Link>
                                    </li>

                                    {categories?.map((c) => (
                                        <li key={c._id}><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
                                    ))}
                                </ul>

                            </li>
                            {
                                !auth.user ? (<>
                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
                                    </li>
                                </>) : (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>DashBoard</NavLink></li>
                                                <NavLink to="/login" onClick={handleLogout} className="dropdown-item" href="#">Logout</NavLink>
                                            </ul>
                                        </li>

                                    </>
                                )
                            }
                            <li className="nav-item mt-2 ">
                                <Badge count={cart?.length} showZero>
                                    <NavLink to="/cart" className="nav-link" href="#">
                                        Cart
                                    </NavLink>
                                </Badge>
                            </li>

                        </ul>

                    </div>
                </div >
            </nav >
        </>
    )
}
