
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const LoginServices ={

    login: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/login`, {
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
    register: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`${API_URL}/users/create`, {
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
    }
}; 
