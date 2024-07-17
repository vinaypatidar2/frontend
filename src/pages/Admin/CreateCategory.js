import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "../../components/Forms/CategoryForm";
import { Modal } from 'antd';
import slugify from "slugify";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";


const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name });

            if (data?.success) {
                alert("Category created successfully");
                getAllCategory();
            } else {
                alert(data.message);
            }

        } catch (error) {
            // console.log(error);
            alert("Something went wrong in submitting the form")
        }
    }
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
            if (data?.success) {
                setCategories(data?.category);
            }

        } catch (error) {
            // console.log(error);
            alert("Something went wrong in getting all Category");
        }
    }

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleUpdate = async(e) =>{
        e.preventDefault();

        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name:updatedName, slug:slugify(updatedName) });

            if (data?.success) {
                getAllCategory();
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                alert("Category Updated successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            // console.log(error);
            alert("Error in submitting the updated value");
            
        }
    }
    const handleDelete = async(pId) =>{
        // e.preventDefault();

        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`);

            if (data?.success) {
                getAllCategory();
                alert("Category Deleted successfully");
            } else {
                alert(data.message);
            }
        } catch (error) {
            // console.log(error);
            alert("Error in deleting category");
            
        }
    }



    return (
        <Layout>
            <div className="container-fluid m-3 p-3 dashboard">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Manage Category</h1>
                        <div>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className="w-75">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c) => (
                                        <>
                                            <tr>
                                                <td key={c._id}>{c.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-primary ms-2"
                                                        onClick={() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-danger ms-2"
                                                     onClick={() => handleDelete(c._id)}
                                                    
                                                    >
                                                        Delete</button>
                                                </td>
                                            </tr>
                                        </>
                                    ))}


                                </tbody>
                            </table>
                        </div>

                        <Modal
                            onCancel={() => setVisible(false)}
                            footer={null}
                            visible={visible}
                        >
                            <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                        </Modal>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory;