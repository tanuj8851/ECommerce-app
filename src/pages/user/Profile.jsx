import React, { useState, useEffect } from 'react'
import { Layout } from '../../components/layout/Layout'
import { UserMenu } from '../../components/layout/UserMenu'
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import toast from 'react-hot-toast';

export const Profile = () => {

    //context
    const [auth, setAuth] = useAuth();

    //state
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");



    //get user data
    useEffect(() => {
        const { email, name, phone, address } = auth.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address)

    }, [auth?.user])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`, {
                name, email, password, phone, address
            });

            if (data?.error) {
                toast.error(data?.error)
            } else {
                setAuth({ ...auth, user: data?.updatedUser })
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls)
                ls.user = data.updatedUser
                localStorage.setItem("auth", JSON.stringify(ls))
                toast.success("Profile Updated Successfully.")
            }

        } catch (error) {
            console.log(error);
            toast.error("Something Went Wrong");
        }

    }


    return (
        <Layout title={"DashBoard - Profile"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="form-container ">
                            <form onSubmit={handleSubmit}>
                                <h4 className="title">UPDATE FORM</h4>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="form-control"
                                        id="exampleInputName1"
                                        placeholder="Enter Your Name"

                                        autoFocus
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        placeholder="Enter Your Email "

                                        disabled
                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPassword1"
                                        placeholder="Enter Your Password"

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="form-control"
                                        id="exampleInputPhone1"
                                        placeholder="Enter Your Phone"

                                    />
                                </div>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="form-control"
                                        id="exampleInputAddress1"
                                        placeholder="Enter Your Address"

                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    UPDATE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
