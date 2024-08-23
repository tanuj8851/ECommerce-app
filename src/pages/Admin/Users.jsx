import React from 'react'
import { Layout } from '../../components/layout/Layout'
import { AdminMenu } from '../../components/layout/AdminMenu'
export const Users = () => {
    return (
        <Layout title={"All Users - Ecommerce App"}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        All Users
                    </div>
                </div>
            </div>
        </Layout>
    )
}
