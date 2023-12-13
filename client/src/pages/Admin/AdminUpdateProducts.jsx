import React,{ useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import AdminMenu from '../../components/AdminMenu'
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;


const AdminUpdateProducts = () => {

  const params = useParams();
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

   const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/products/get-product/${params.slug}`
      );
      setTitle(data.product.title);
      setId(data.product._id);
      setDesc(data.product.desc);
      setImage(data.product.image);
      setPrice(data.product.price);
      setSize(data.product.size);
      setColor(data.product.color);
      setBrand(data.product.brand);
      setInStock(data.product.inStock);
      setCategory(data.product.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("title", title);
      productData.append("desc", desc);
      productData.append("price", price);
      productData.append("size", size);
      productData.append("image", image);
      productData.append("category", category);
      productData.append("color", color);
      productData.append("brand", brand);
      productData.append("inStock", inStock);
      const { data } = axios.put(
        `/api/v1/products/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        Navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/products/delete-product/${id}`
      );
      toast.success("Product DEleted Succfully");
      Navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
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
                <button className="btn btn-primary" onClick={handleUpdate}>
                  UPDATE PRODUCT
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminUpdateProducts

  