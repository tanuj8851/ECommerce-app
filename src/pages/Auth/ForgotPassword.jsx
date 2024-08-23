import React, { useState } from 'react'
import { Layout } from './../../components/layout/Layout';
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../../styles/AuthStyles.css";


export const ForgotPassword = () => {


    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");


    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email, newPassword, answer
            });

            if (res.data.success) {
                toast.success(res.data.message)
                navigate("/");
            } else {
                toast.error(res.data.message);
            }


        } catch (error) {
            toast.error("Something Went Wrong");
        }

    }


    return (
        <Layout title="Register - Ecommer App">
            <div className="form-container ">
                <form onSubmit={handleSubmit}>
                    <h4 className="title">Forgot Password Form</h4>

                    <div className="mb-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            id="exampleInputEmail1"
                            placeholder="Enter Your Email "
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="form-control"
                            id="exampleInputAnswer"
                            placeholder="What is Your College Roll No. ? "
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Enter Your New Password"
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">
                        Forgot Password
                    </button>
                </form>
            </div>
        </Layout>
    )
}
