import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layout/Layout'
import { UserMenu } from '../../components/layout/UserMenu';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import moment from "moment";



export const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])

    console.log(orders);

    return (
        <Layout title={"DashBoard - Orders"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        All Orders
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div className="border shadow">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope='col'>#</th>
                                                    <th scope='col'>Status</th>
                                                    <th scope='col'>Buyer</th>
                                                    <th scope='col'>Orders</th>
                                                    <th scope='col'>Payment</th>
                                                    <th scope='col'>Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>
                                                    <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                    <td>{o?.products?.length}</td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="container">
                                            {
                                                o?.products?.map((p, i) => (
                                                    <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                        <div className="col-md-4">
                                                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                                className="card-img-top " alt={p.name} width={"100px"} height={"250px"} />
                                                        </div>
                                                        <div className="col-md-8">
                                                            <h4>{p.name}</h4>
                                                            <p>{p.description.substring(0, 30)}</p>
                                                            <h4>Price:- $ {p.price}</h4>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}
