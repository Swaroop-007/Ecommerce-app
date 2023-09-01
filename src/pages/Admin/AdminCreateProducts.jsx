import React from 'react'
import Navbar from '../../components/Navbar'
import AdminMenu from '../../components/AdminMenu'
import { useState,useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import {Select} from 'antd'

const { Option } = Select;



const AdminCreateProducts = () => {
  const Navigate = useNavigate();
  const [sizename,setSizeName]=useState("")
  const [colorname,setColorName]=useState("")
  const [title,setTiltle]=useState("")
  const [image,setImage]=useState("")
  const [desc,setDesc]=useState("")
  const [price,setPrice]=useState(0)
  const [category,setCategory]=useState("")
  const [size,setSize] = useState([])
  const [color,setColor]=useState([])
  const [brand,setBrand]=useState("")
  const [inStock,setInStock]=useState(true)



  const handleCreate = async (e)=>{
    e.preventDefault();
    try { 
        const res= await axios.post("/api/v1/products/create-product",{title,desc,color,image,price,category,size,brand,inStock});
        if(res && res.data.success){
            toast.success(res.data && res.data.message);
            Navigate("/dashboard/admin/products");
        }
        else{
            toast.error(res.data.message);
            console.log(res.data.message);
        }
    } catch (error) {
        console.log(error)
        toast.error('Something Went Wrong!');
    }
};


  return (
    <div>
      <Navbar/>
        <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              

             
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Product Title"
                  className="form-control"
                  onChange={(e) => setTiltle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={image}
                  placeholder="Product Image link"
                  className="form-control"
                  onChange={(e) => setImage(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={desc}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="What is the Price?"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={category}
                  placeholder="Select a category"
                  className="form-control"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  value={sizename}
                  placeholder="Add a size"
                  className="form-control"
                  onChange={(e) => setSizeName(e.target.value)}
                />
                <button className="btn btn-primary mt-1" onClick={() => {
                            setSize([
                              ...size,sizename
                            ]);
                            }}>Add
                </button>
                
              </div>
              <div className="mb-3">
                <input
                  value={colorname}
                  placeholder="Add color"
                  className="form-control"
                  onChange={(e) => setColorName(e.target.value)}
                />
                <button className="btn btn-primary mt-1" onClick={() => {
                            setColor([
                              ...color,colorname
                            ]);
                            }}>Add
                </button>
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={brand}
                  placeholder="Brand Name"
                  className="form-control"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Stock "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setInStock(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCreateProducts