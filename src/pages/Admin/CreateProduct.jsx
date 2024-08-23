import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { AdminMenu } from '../../components/layout/AdminMenu';
import axios from "axios";
import toast from 'react-hot-toast';
import { Select } from "antd";
import { Option } from 'antd/es/mentions';
import { useNavigate } from 'react-router-dom';


export const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

    //get all category
    const getAllCategory = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something wrong in getting category.")
        }
    }

    useEffect(() => {
        getAllCategory();
    }, [])

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        try {

            const productData = new FormData();

            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            productData.append("photo", photo);

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if (data?.success) {
                toast.success(`Product Created Successfully.`);
                navigate("/dashboard/admin/products")
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in create product.")
        }
    }

    return (
        <Layout title={"Create Product - Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select variant={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value) => setCategory(value)}>
                                {categories?.map((c) => (
                                    <Select.Option key={c._id} value={c._id}>{c.name}</Select.Option>
                                ))}
                            </Select>
                            <div className="mb-3">
                                <label className="btn btn-outline-secondary col-md-12">
                                    {photo ? photo.name : "Upload Photo "}
                                    <input type="file" name="photo" accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Enter Products Name' className="form-control" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={description} placeholder='Enter Products Description' className="form-control" onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="text" value={price} placeholder='Enter Products price' className="form-control" onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='Enter Products Quantity' className="form-control" onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <Select variant={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)}>
                                    <Select.Option value="0">No</Select.Option>
                                    <Select.Option value="1">Yes</Select.Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleCreateProduct}>CREATE PRODUCT</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
