import React, { useState, useEffect } from 'react'
import { AdminMenu } from '../../components/layout/AdminMenu'
import { Layout } from '../../components/layout/Layout';
import { useAuth } from '../../context/Auth';
import moment from 'moment';
import axios from 'axios';
import { Select } from 'antd';


export const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "delivered", "cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);

    const [auth, setAuth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token])


    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value
            });
            getOrders();
        } catch (error) {
            console.log(error);

        }
    }

    return (

        <Layout title={"Admin Orders - Ecommerce App."}>
            <div className="row">
                <div className="col-md-3 mt-2">
                    <AdminMenu />
                </div>
                <div className="col-md-8 mt-2 ">
                    <h1 className="text-center">All Orders</h1>
                    {
                        orders?.map((o, i) => {
                            return (
                                <div className="border shadow p-2">
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
                                                <td>
                                                    <Select onChange={(value, orderId) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                        {
                                                            status.map((s, i) => (
                                                                <Select.Option key={i} value={s}>
                                                                    {s}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </td>
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
        </Layout>
    )
}
