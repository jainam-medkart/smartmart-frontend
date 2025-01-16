import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../service/ApiService";
import '../style/register.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phoneNumber: '',
        password: ''
    });

    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        // Validate email
        if (!formData.email) {
            newErrors.email = "Email is required";
        }

        // Validate name
        if (!formData.name) {
            newErrors.name = "Name is required";
        }

        // Validate phone number (should be exactly 10 digits)
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Phone number must be exactly 10 digits";
        }

        // Validate password (minimum length 6)
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await ApiService.registerUser(formData);
            if (response.status === 200) {
                setMessage("Registration successful! Redirecting to login...");
                setTimeout(() => {
                    navigate("/login");
                }, 3000);
            }
        } catch (error) {
            setMessage(error.response?.data.message || error.message || "Registration failed.");
        }
    };

    return (
        <div className="register-page">
            <h2>Register</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Phone Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                    {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}
                </div>

                <button type="submit">Register</button>
                <p className="register-link">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
