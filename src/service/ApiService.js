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
        try {
            // Construct the query parameters from formData
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
                params.append(key, value);
            });

            const response = await axios.post(`${this.BASE_URL}/product/create?${params.toString()}`, null, {
                headers: this.getHeader() // Correctly set headers
            });
            console.log(`${this.BASE_URL}/product/create?${params.toString()}`)

            return response.data;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    static async addProduct2(productData) {
        try {
            console.log(productData)
            const response = await axios.post(`${this.BASE_URL}/product/createtg`, productData, {
                headers: this.getHeader() // Correctly set headers
            });
            console.log(`${this.BASE_URL}/product/create`, productData);

            return response.data;
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }

    // static async updateProduct(formData) {
    //     const response = await axios.put(`${this.BASE_URL}/product/update`, formData, {
    //         headers: this.getHeader()
    //     })

    //     return response.data;
    // }

    static async updateProduct(productId, formData) {
        try {
            // Construct the query parameters from formData, removing null or empty values
            const params = new URLSearchParams();
            formData.forEach((value, key) => {
                if (value !== null && value !== '') {
                    params.append(key, value);
                }
            });

            const response = await axios.put(`${this.BASE_URL}/product/update?productId=${productId}&${params.toString()}`, null, {
                headers: this.getHeader() // Correctly set headers
            });
            console.log(`${this.BASE_URL}/product/update?productId=${productId}&${params.toString()}`);

            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }

    static async updateProducttg(productId, formData) {
        try {
            formData.append('imageUrl', formData.get('image'));

            const response = await axios.put(
                `${this.BASE_URL}/product/updatetg?productId=${productId}`,
                formData,
                {
                    headers: this.getHeader() // Correctly set headers
                }
            );
            console.log(`${this.BASE_URL}/product/update?productId=${productId}`);

            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
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

    // static async deleteProductById(productId) {
    //     const formData = new FormData();
    //     formData.append('quantity', 0);

    //     const response = await this.updateProduct(productId, formData);

    //     return response;
    // }

    static async deleteProductById(productId) {
        const response = await axios.delete(`${this.BASE_URL}/product/delete/${productId}`, {
            headers: this.getHeader()
        });
        return response.data;
    }

    static async updateOrderItemStatus(orderItemId, status) {
        try {
            const response = await axios.put(`${this.BASE_URL}/order/update-item-status/${orderItemId}`, null, {
                headers: this.getHeader(),
                params: { status }
            });

            console.log(response.data);

            return response.data;
        } catch (error) {
            console.error('Error updating order item status:', error);
            throw error;
        }
    }

    // Category Endpoints
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
        try {
            const response = await axios.put(`${this.BASE_URL}/order/place`, body, {
                headers: this.getHeader()
            });
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
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
        return response.data.user.role === "ADMIN" || response.data.user.role === "ROOT_ADMIN";
    }

    static async isRoot() {
        const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
            headers: this.getHeader()
        });
        return response.data.user.role === "ROOT_ADMIN";
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

    static async fetchAllImagesFromProductId(productId) {
        try {
            const response = await axios.get(`${this.BASE_URL}/product/${productId}/images`, {
                headers: this.getHeader()
            })
            console.log(response.data)
            return response.data;
        } catch {
            console.log("Can't fetch extra images")
        }
    }

    static async setExtraImages(productId, newImages) {
        try {
            const payload = {
                imageUrls: newImages
            };
            const response = await axios.post(`${this.BASE_URL}/product/${productId}/add-images`, JSON.stringify(payload), {
                headers: {
                    ...this.getHeader(),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.log("Can't set extra images", error);
        }
    }

    static async deleteExtraImage(productId, imageKey) {
        try {
            const response = await axios.delete(`${this.BASE_URL}/product/${productId}/delete-image/${imageKey}`, {
                headers: this.getHeader()
            })
        } catch (error) {
            console.log("Couldn't delete the image")
        }
    }

    static async createAdmin(adminData) {
        console.log(adminData);
        try {
            const response = await axios.post(`${this.BASE_URL}/auth/register-admin`, adminData, {
                headers: this.getHeader()
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error.response?.data);
            return error.response?.data?.message || error.message;
        }
    }

    static async fetchRevenueTrends(startDate, endDate) {
        try {
            const response = await axios.get(`${this.BASE_URL}/analytics/revenue-trends`, {
                headers: this.getHeader(),
                params: {
                    startDate: startDate,
                    endDate: endDate
                }
            });
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Failed to fetch revenue trends:", error);
            throw error;
        }
    }
}