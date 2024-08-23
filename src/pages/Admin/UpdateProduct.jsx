import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { AdminMenu } from '../../components/layout/AdminMenu';
import axios from "axios";
import toast from 'react-hot-toast';
import { Select } from "antd";
import { Option } from 'antd/es/mentions';
import { useNavigate, useParams } from 'react-router-dom';

export const UpdateProduct = () => {


    const navigate = useNavigate();
    const params = useParams();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");
    const [id, setId] = useState("");

    //get single product
    const getSingleProduct = async () => {
        try {

            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/single-product/${params.slug}`);
            if (data?.success) {
                // console.log(data);
                const product = data.Product[0];
                setName(product.name);
                setId(product._id);
                setDescription(product.description);
                setPrice(product.price);
                setCategory(product.category._id);
                setQuantity(product.quantity);
                setShipping(product.shipping);
            }

        } catch (error) {
            console.log(error);
            toast.error("Something wrong in getting category.")
        }
    }

    useEffect(() => {
        getSingleProduct();

        //eslint-disable-next-line
    }, [])




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

    const handleUpdateProduct = async (e) => {
        e.preventDefault();



        try {

            const productData = new FormData();

            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            photo && productData.append("photo", photo);
            productData.append("category", category)



            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData);
            if (data?.success) {
                toast.success(`Product Updated Successfully.`);
                navigate("/dashboard/admin/products")
            } else {
                toast.error(data?.message)
            }

        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in update product.")
        }
    }


    const handleDeleteProduct = async () => {
        try {

            let answer = window.prompt("Are you sure to delete this product? yes | no");
            if (!answer) return
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`);
            toast.success("Product Deleted Successfully.")
            navigate("/dashboard/admin/products");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in Deleting product.")
        }
    }

    return (
        <Layout title={"Update Product - Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Update Product</h1>
                        <div className="m-1 w-75">
                            <Select variant={false}
                                placeholder="Select a category" size='large' showSearch className='form-select mb-3'
                                onChange={(value) => setCategory(value)} value={category}>
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
                                {photo ? (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt="product_photo" height={"200px"} className='img img-responsive' />
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
                                <Select variant={false} placeholder="Select Shipping" size='large' showSearch className='form-select mb-3' onChange={(value) => setShipping(value)} value={shipping ? "yes" : "No"}>
                                    <Select.Option value="0">No</Select.Option>
                                    <Select.Option value="1">Yes</Select.Option>
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-primary" onClick={handleUpdateProduct}>UPDATE PRODUCT</button>
                            </div>
                            <div className="mb-3">
                                <button className="btn btn-danger" onClick={handleDeleteProduct}>DELETE PRODUCT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
