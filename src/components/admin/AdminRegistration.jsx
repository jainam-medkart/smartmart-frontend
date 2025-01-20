import React, { useState } from "react";
import "../../style/adminRegPage.css";
import ApiService from '../../service/ApiService'

const CreateAdminPage = () => {
    const [adminData, setAdminData] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (adminData.password !== adminData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            const response = await ApiService.createAdmin(adminData);
            if (response.status === 200) {
                setSuccessMessage("Admin created successfully!");
                setError(null);
                setAdminData({
                    name: "",
                    email: "",
                    phoneNumber: "",
                    password: "",
                    confirmPassword: "",
                });
            } else {
                setError(response.message || "Unable to create admin");
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to create admin");
        }
    };

    return (
        <div className="admin-create-page p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-[#003366]">Create New Admin</h1>
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {error && <p className="text-red-500">{error}</p>}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-medium text-[#003366]">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={adminData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#003366] focus:border-[#003366]"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-medium text-[#003366]">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={adminData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#003366] focus:border-[#003366]"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-[#003366]">Phone Number</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={adminData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#003366] focus:border-[#003366]"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="block text-sm font-medium text-[#003366]">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={adminData.password}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#003366] focus:border-[#003366]"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#003366]">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={adminData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#003366] focus:border-[#003366]"
                    />
                </div>

                <button type="submit" className="w-full py-2 px-4 bg-[#003366] text-white font-semibold rounded-md shadow-md hover:bg-[#002244] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366]">
                    Create Admin
                </button>
            </form>
        </div>
    );
};

export default CreateAdminPage;