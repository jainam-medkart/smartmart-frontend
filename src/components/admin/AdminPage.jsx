import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../../style/adminPage.css';
import ApiService from "../../service/ApiService";

const AdminPage = () => {
    const [isRootAdmin, setIsRootAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkRootAdminStatus = async () => {
            try {
                const adminStatus = await ApiService.isRoot();
                setIsRootAdmin(adminStatus);
            } catch (error) {
                console.error("Failed to check admin status:", error);
            }
        };

        checkRootAdminStatus();
    }, []);

    return (
        <div className="admin-page">
            <h1>Welcome Admin</h1>
            <button onClick={() => navigate("/admin/categories")}>Manage Categories</button>
            <button onClick={() => navigate("/admin/products")}>Manage Products</button>
            <button onClick={() => navigate("/admin/orders")}>Manage Orders</button>
            {isRootAdmin && <button onClick={() => navigate("/admin/add-admin")}>Add New Admin</button>}
        </div>
    );
};

export default AdminPage;