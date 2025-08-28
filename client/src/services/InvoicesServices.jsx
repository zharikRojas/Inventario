
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const InvoicesServices ={

    create: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/invoices/create`, {
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
    getAllInvoices: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/invoices/getAll`, {
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
    getInvoiceByUuid: (uuid) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/invoices/get/${uuid}`, {
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
    getInvoicesByUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/invoices/get-invoices-user/${id}`, {
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
    getOrdersByUser: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/invoices/get-orders-user/${id}`, {
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
    }
}; 
