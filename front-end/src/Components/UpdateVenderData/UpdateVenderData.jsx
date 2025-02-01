import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "././../AddNewVendorForm/AddNewVendorForm.scss"
import { onChangeValidationCheck } from '../../Context/CommonFunction';
const URL = import.meta.env.VITE_API_BASE_URL;


const UpdateVenderData = () => {
    const [vendor, setVendor] = useState({
        name: "",
        type: "",
        criticality: "",
        status: "",
        contact: "",
        serviceProvided: "",
    });

    const [errors, setErrors] = useState({});
    const params = useParams();
    const navigate = useNavigate();

    const validateForm = () => {
        let newErrors = {};

        if (!vendor.name) newErrors.name = "Vendor name is required";
        if (!vendor.type) newErrors.type = "Vendor type is required";
        if (!vendor.criticality) newErrors.criticality = "Criticality is required";
        if (!vendor.status) newErrors.status = "Status is required";
        if (!vendor.contact) {
            newErrors.contact = "Contact email is required";
        } else if (!/\S+@\S+\.\S+/.test(vendor.contact)) {
            newErrors.contact = "Invalid email format";
        }
        if (!vendor.serviceProvided) newErrors.serviceProvided = "Service provided is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        getSingleVendorDetails();
    }, [])

    const getSingleVendorDetails = async () => {
        let result = await fetch(`${URL}/admin/vendor/${params.id}`, {
        })
        result = await result.json();
        if (result) {
            let initialInBuildValue = {
                name: result.name,
                type: result.type,
                criticality: result.criticality,
                status: result.status,
                contact: result.contact,
                serviceProvided: result.serviceProvided
            }
            setVendor(initialInBuildValue)
        }
    }

    const handleChange = (e) => {
        setVendor({ ...vendor, [e.target.name]: e.target.value });
        let fieldErrors = onChangeValidationCheck(e.target.name, e.target.value);
        setErrors({ ...errors, ...fieldErrors });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Sending the data to the backend
            let result = await fetch(`http://localhost:5500/admin/vendor/${params.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(vendor),
            });

            result = await result.json();
            console.log(result);
            navigate("/")
            setVendor({
                name: "",
                type: "",
                criticality: "",
                status: "",
                contact: "",
                serviceProvided: "",
            });
            setErrors({});
        }
    };
    return (
        <div className="vendor-form-container">
            <h2>Update Vendor Details</h2>
            <form onSubmit={handleSubmit} className="vendor-form">
                <div className="form-group">
                    <label>Vendor Name</label>
                    <input
                        type="text"
                        name="name"
                        value={vendor.name}
                        onChange={handleChange}
                        placeholder="Enter vendor name"
                    />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <select name="type" value={vendor.type} onChange={handleChange}>
                        <option value="">Select Type</option>
                        <option value="Supplier">Supplier</option>
                        <option value="Service Provider">Service Provider</option>
                        <option value="Logistics">Logistics</option>
                        <option value="Technology">Technology</option>
                    </select>
                    {errors.type && <span className="error">{errors.type}</span>}
                </div>

                <div className="form-group">
                    <label>Criticality</label>
                    <select name="criticality" value={vendor.criticality} onChange={handleChange}>
                        <option value="">Select Criticality</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                    {errors.criticality && <span className="error">{errors.criticality}</span>}
                </div>

                <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={vendor.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                    </select>
                    {errors.status && <span className="error">{errors.status}</span>}
                </div>

                <div className="form-group">
                    <label>Contact Email</label>
                    <input
                        type="email"
                        name="contact"
                        value={vendor.contact}
                        onChange={handleChange}
                        placeholder="Enter contact email"
                    />
                    {errors.contact && <span className="error">{errors.contact}</span>}
                </div>

                <div className="form-group">
                    <label>Service Provided</label>
                    <input
                        type="text"
                        name="serviceProvided"
                        value={vendor.serviceProvided}
                        onChange={handleChange}
                        placeholder="Enter service provided"
                    />
                    {errors.serviceProvided && <span className="error">{errors.serviceProvided}</span>}
                </div>

                <button type="submit" className="submit-btn">Update Vendor Details</button>
            </form>
        </div>
    )
}

export default UpdateVenderData;