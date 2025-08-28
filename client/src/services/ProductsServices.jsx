
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const ProductsServices ={

    create: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/products/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const json = await response.json();
                if (response.ok) {
                    resolve(json);
                } else {
                    reject(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    getProducts:() => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/products/get`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = await response.json();
                if (response.ok) {
                    resolve(json);
                } else {
                    reject(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    getProductByUuid: (uuid) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/products/get/${uuid}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = await response.json();
                if (response.ok) {
                    resolve(json);
                } else {
                    reject(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    updateProduct: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/products/update`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                const json = await response.json();
                if (response.ok) {
                    resolve(json);
                } else {
                    reject(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    },
    deleteProduct: (uuid) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/products/inactive/${uuid}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                const json = await response.json();
                if (response.ok) {
                    resolve(json);
                } else {
                    reject(json);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}; 
