import React from 'react'
import Navbar from '../../components/Navbar'
import AdminMenu from '../../components/AdminMenu'

const AdminUsers = () => {
  return (
    <div>
      <Navbar/>
        <div className="container-fluid m-3 p-3 dashboard">
            <div className="row">
              <div className="col-md-3">
                  <AdminMenu />
              </div>
              <div className="col-md-9">
                    <div className="card w-75 p-3">
                      <h1>Users</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminUsers