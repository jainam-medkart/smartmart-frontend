import axios from 'axios';

export default class ApiService {
    static BASE_URL = "http://localhost:8080";

    static getHeader() {
        // since we need token to be passed in header for every request
        const token = localStorage.getItem('token')
        return {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    }

    // Auth and User Related Endpoints
    static async registerUser(registrationdetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registrationdetails)
        return response.data;
    }

    static async loginUser(logindetails) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, logindetails)
        return response.data;
    }

    static async getLoggedInUserInfo() {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        })
        return response.data;
    }


    // Product Endpoints
    static async addProduct(formData) {
        const response = await axios.post(`${this.BASE_URL}/product/create`, formData, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async updateProduct(productId, formData) {
        const response = await axios.put(`${this.BASE_URL}/product/update/${productId}`, formData, {
            headers: this.getHeader()
        })

        return response.data;
    }

    static async getAllProducts() {
        const response = await axios.get(`${this.BASE_URL}/product/get-all`)
        return response.data;
    }

    static async searchProducts(searchValue) {
        const response = await axios.get(`${this.BASE_URL}/product/search`, {
            params: { searchValue }
        })
        return response.data;
    }

    static async getAllProductsByCategoryId(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/product/get-by-category-id/${categoryId}`)
        return response.data;
    }

    static async getProductById(productId) {
        const response = await axios.get(`${this.BASE_URL}/product/id/${productId}`)
        return response.data;
    }

    static async deleteProductById(productId) {
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`,
            {
                headers: this.getHeader()
            }
        )
        return response.data;
    }

    static async updateOrderItemStatus(orderItemId, status) {
        const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, {
            header: this.getHeader(),
            params: { status }
        })

        return response.data;
    }


    // Product Endpoints
    static async createCategory(body) {
        const response = await axios.post(`${this.BASE_URL}/category/create`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async getAllCategory() {
        const response = await axios.get(`${this.BASE_URL}/category/get-all`)
        return response.data;
    }

    static async getCategoryById(categoryId) {
        const response = await axios.get(`${this.BASE_URL}/category/id/${categoryId}`)
        return response.data;
    }

    static async updateCategory(categoryId, body) {
        const response = await axios.put(`${this.BASE_URL}/category/update/${categoryId}`, body, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async deleteCategory(categoryId) {
        const response = await axios.delete(`${this.BASE_URL}/category/delete/${categoryId}`, {
            headers: this.getHeader()
        })

        return response.data;
    }

    // Order Endpoints
    static async createOrder(body) {
        const response = await axios.post(`${this.BASE_URL}/order/create`, body, {
            headers: this.getHeader()
        })

        return response.data;
    }

    static async getAllOrders() {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader()
        })

        return response.data;
    }

    static async getOrderItemById(itemId) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { itemId }
        })

        return response.data;
    }

    static async getOrderItemByStatus(status) {
        const response = await axios.get(`${this.BASE_URL}/order/filter`, {
            headers: this.getHeader(),
            params: { status }
        })

        return response.data;
    }


    // Address Endpoints
    static async saveAddress(body) {
        const response = await axios.post(`${this.BASE_URL}/address/save`, body, {
            headers: this.getHeader()
        })

        return response.data;
    }

    // Authentication Checker
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    static async isAdmin() {

        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data.user.role === "ADMIN";

        // const role = localStorage.getItem('role')
        // return role == 'ADMIN'
    }

    // Add the function to ApiService
    static async uploadToCloudinary(file) {
        try {
            const formData = new FormData();
            formData.append("file", file); // The image file
            formData.append("upload_preset", "mentorOne"); // Replace with your upload preset from Cloudinary
            formData.append("cloud_name", "domwwopwt"); // Replace with your Cloudinary cloud name
            
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/domwwopwt/image/upload`, // Replace 'your_cloud_name'
                formData
            );

            // The response will contain the URL of the uploaded image
            return response.data.secure_url;
        } catch (error) {
            throw new Error(
                error.response?.data?.message || error.message || "Failed to upload image to Cloudinary"
            );
        }
    }




}